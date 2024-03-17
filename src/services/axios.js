
const axios = require('axios');
const jwt = require('jsonwebtoken');
const config = require('../config');


class AxiosService{
    constructor(baseUrl,serviceName){
        this.axios = this.axiosCreateInstance(baseUrl,serviceName);
    }

    axiosCreateInstance(baseUrl,serviceName){
        let requestGatewayToken = '';

        if(serviceName){
            requestGatewayToken = jwt.sign({id:serviceName},`${config.GATEWAY_JWT_TOKEN}`);
        }
        const instance = axios.create({
            baseURL:baseUrl,
            Headers:{
                'Content-Type':'application/json',
                Acdept: 'application/json',
                gatewayToken: requestGatewayToken
            },
            withCredentials:true
        });

        return instance;
    }
}

module.exports = {AxiosService}