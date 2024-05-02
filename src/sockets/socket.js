
import {GatewayCache} from '../redis/gateway.cache.js'
import {io} from 'socket.io-client';
import {winstonLogger} from '../../../9-jobber-shared/src/logger.js'
import config from '../config.js';
const log = winstonLogger('gatewaySocket','debug');

let chatSocketClient;


export class socketIOAppHandler{
    constructor(io){
        this.io = io;
        this.gatewayCache = new GatewayCache();
        this.#chatSocketServiceIOConnections();
    }

    listen(){
        this.#chatSocketServiceIOConnections();

        this.io.on('connection',async(socket)=>{
            
            socket.on('getLoggedInUsers', async()=>{
                const response = this.gatewayCache.getLoggedInUsersFromCache('loggedInUsers');
                this.io.emit('online', response);
            });
            socket.on('loggedInUsers', async(username)=>{
                const response = this.gatewayCache.saveLoggedInUserToCache('loggedInUsers',username);
                this.io.emit('online', response);
            });
            socket.on('removeLoggedInUser', async(username)=>{
                const response = this.gatewayCache.removeLoggedInUserFromCache('loggedInUsers',username);
                this.io.emit('online', response);
            });
            socket.on('category', async(category,username)=>{
                this.gatewayCache.saveUserSelectedCategory(`selectedCategories${username}`,category);
                
            });
        })
    }

    #chatSocketServiceIOConnections() {
        chatSocketClient = io(`${config.MESSAGE_BASE_URL}`, {
          transports: ['websocket', 'polling'],
          secure: true
        });
    
        chatSocketClient.on('connect', () => {
          log.info('ChatService socket connected');
        });
    
        chatSocketClient.on('disconnect', (reason) => {
          log.log('error', 'ChatSocket disconnect reason:', reason);
          chatSocketClient.connect();
        });
    
        chatSocketClient.on('connect_error', (error) => {
          log.log('error', 'ChatService socket connection error:', error);
          chatSocketClient.connect();
        });


        // custom-events
        chatSocketClient.on('message recieved',(data)=>{
            this.io.emit('message recieved',data);
        })
        chatSocketClient.on('message updated',(data)=>{
            this.io.emit('message updated',data);
        })


    }
}
