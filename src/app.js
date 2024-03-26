import { GatewayServer } from './server.js';
import express from 'express';

class Application {
    init() {
        const app = express();
        const server = new GatewayServer(app);
        server.start();
    }
}

const application = new Application();
application.init();
