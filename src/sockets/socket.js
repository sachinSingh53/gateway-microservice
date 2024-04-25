
import {GatewayCache} from '../redis/gateway.cache.js'



export class socketIOAppHandler{
    constructor(io){
        this.io = io;
        this.gatewayCache = new GatewayCache();
    }

    listen(){
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
}
