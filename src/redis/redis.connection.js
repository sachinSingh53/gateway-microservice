
import {winstonLogger} from '../../../9-jobber-shared/src/logger.js';
import{createClient} from 'redis'
import config from '../config.js';
const log = winstonLogger('GatewayRedisConnection','debug');

class RedisConnection{
    constructor(){
        this.client = createClient({ url: `${config.REDIS_HOST}` });
    }

    async redisConnect(){
        try {
            await this.client.connect();
            log.info(`gatewayServiceRedisConnection: ${await this.client.ping()}`);
            this.cacheError();
        } catch (error) {
            log.log('error', 'gatewayService redisConnect() method: ', error);
        }
    
    }
    
    cacheError(){
        this.client.on('error', (error) => {
            console.log(error);
        })
    };
}

const redisConnection = new RedisConnection();

export{redisConnection};