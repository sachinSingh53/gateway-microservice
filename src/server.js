import express from 'express';
import cookieSession from 'cookie-session';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import config from './config.js';
import { axiosAuthInstance } from './services/api/auth-service.js';
import { winstonLogger } from '../../9-jobber-shared/src/logger.js';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../9-jobber-shared/src/errors.js';
import authRoutes from './routes/auth.js';
import currentUserRoutes from './routes/currentUser.js';

const log = winstonLogger('Gateway Server', 'debug');

class GatewayServer {
    #app;

    constructor(app) {
        this.#app = app;
    }

    start() {
        this.#securityMiddleware(this.#app);
        this.#standardMiddleware(this.#app);
        this.#routesMiddleware(this.#app);
        this.#errorHandler(this.#app);
        this.#startServer(this.#app);
    }

    #securityMiddleware(app) {
        app.set('trust-proxy', 1);
        app.use(
            cookieSession({
                name: 'session',
                keys: [config.SECRET_KEY_ONE, config.SECRET_KEY_TWO],
                maxAge: 24 * 7 * 60 * 60 * 10000,
                secure: config.NODE_ENV !== 'development'
            })
        );
        app.use(
            cors({
                origin: config.CLIENT_URL,
                credentials: true,
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
            })
        );

        app.use((req, _res, next) => {
            if (req.session.jwt) {
                axiosAuthInstance.defaults.headers['Authorization'] = `Bearer ${req.session.jwt}`;
            }
            next();
        });
    }

    #standardMiddleware(app) {
        app.use(compression());
        app.use(bodyParser.json({ limit: '200mb' }));
        app.use(bodyParser.urlencoded({ extended: true, limit: '200mb' }));
    }

    #routesMiddleware(app) {
        app.use('/api/gateway/v1', authRoutes);
        app.use('/api/gateway/v1',currentUserRoutes)
    }

    #errorHandler(app) {
        app.use('*', (req, res, next) => {
            log.error('endpoint does not exist', '');
            res.status(StatusCodes.NOT_FOUND).json({
                message: 'the endpoint you have called does not exists'
            });
            next();
        });

        app.use((err, req, res, next) => {
            log.error('Gateway Service Error', `${err.comingFrom}`, err);
            if (err instanceof CustomError) {
                res.status(err.statusCode).json(err.serializeErrors());
            }
            next();
        });
    }

    #startServer(app) {
        try {
            const SERVER_PORT = 4000;
            app.listen(SERVER_PORT, () => {
                log.info(`Gateway server is listening on PORT: ${SERVER_PORT}`);
            });
        } catch (err) {
            log.error('GatewayService startServer() error method:', err);
        }
    }
}

export { GatewayServer };
