import { GatewayServer } from './server.js';
import express from 'express';
import { redisConnection } from './redis/redis.connection.js';
class Application {
    init() {
        const app = express();
        const server = new GatewayServer(app);
        server.start();
        redisConnection.redisConnect();

    }
    
}

const application = new Application();
application.init();
