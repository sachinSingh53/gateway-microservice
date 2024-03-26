require('express-async-errors');
const cookieSession = require('cookie-session'); 
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const config = require('./config');
const { axiosAuthInstance } = require('./services/api/auth-service');
const {winstonLogger} = require('../../9-jobber-shared/src/logger');
const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../../9-jobber-shared/src/errors');
const authRoutes = require('./routes/auth')

const log = winstonLogger('Gateway Server','debug');

class GatewayServer{
    #app;
    constructor(app){
        this.app = app;
    }
    start(){
        this.#securityMiddleware(this.app);
        this.#standardMiddleware(this.app);
        this.#routesMiddleware(this.app);
        this.#errorHandler(this.app);
        this.#startServer(this.app);
    }
    #securityMiddleware(app){
        app.set('trust-proxy',1);
        app.use(
            cookieSession({
                name:'session',
                keys:[`${config.SECRET_KEY_ONE}`,`${config.SECRET_KEY_TWO}`],
                maxAge:24*7*60*60*10000,
                secure:config.NODE_ENV !=='development'
            })
        );
        app.use(cors({
            origin: config.CLIENT_URL,
            credentials:true,
            methods:['GET','POST','PUT','DELETE', 'OPTIONS']
        }));
        
        // this middleware is used to set headers of the axios with the the jwt token present in sessions
        app.use((req,_res,next)=>{
            if(req.session.jwt){
                axiosAuthInstance.defaults.headers['Authorization'] = `Bearer ${req.session.jwt}`;
            }
            next();
        })
        
    }
    #standardMiddleware(app){
        app.use(compression());
        app.use(bodyParser.json({limit: '200mb'}));
        app.use(bodyParser.urlencoded({extended:true,limit: '200mb'}));
    }

    #routesMiddleware(app){
        
        app.use('/api/gateway/v1',authRoutes);
    }

    #errorHandler(app){
        app.use('*',(req,res,next)=>{
            log.log('error','endpoint does not exist','');
            res.status(StatusCodes.NOT_FOUND).json({
                message:'the endpoint you have called does not exists'
            })
            next();
        })
    
        app.use((err,req,res,next)=>{
            log.log('error','Gateway Service Error',`${err.comingFrom}`, err);
            if(err instanceof CustomError){
                res.status(err.statusCode).json(err.serializeErrors());
            }
            next();
        })
        
    }
    
    #startServer(app){
        try{
            const SERVER_PORT = 4000;
            app.listen(SERVER_PORT,()=>{
                log.info(`Gateway server is listening on PORT: ${SERVER_PORT}`);
            })
        }catch(err){
            log.log('error', 'GatewayService startServer() error method:', err);
        }
    } 
};

module.exports = {GatewayServer};