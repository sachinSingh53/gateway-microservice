
const cookieSession = require('cookie-session'); 
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const config = require('./config');
const healthRoutes = require('./routes/health');

const SERVER_PORT = 4000;

class GatewayServer{
    #app;
    constructor(app){
        this.app = app;
    }
    start(){
        this.#securityMiddleware(this.app);
        this.#standardMiddleware(this.app);
        this.#routesMiddleware(this.app);
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
        
    }
    #standardMiddleware(app){
        app.use(compression());
        app.use(bodyParser.json({limit: '200mb'}));
        app.use(bodyParser.urlencoded({extended:true,limit: '200mb'}));
    }
    #routesMiddleware(app){
        app.use('',healthRoutes);
    }
    #startServer(app){
        try{
            app.listen(SERVER_PORT,()=>{
                console.log(`Gateway server is listening on ${SERVER_PORT}`);
            })
        }catch(err){
            console.log(err);
        }
    } 
};

module.exports = {GatewayServer};