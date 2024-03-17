const {GatewayServer} = require('./server');
const express = require('express');
class Application{
    init(){
        const app = express();
        const server = new GatewayServer(app);
        server.start();
    }
}

const application = new Application();

application.init();