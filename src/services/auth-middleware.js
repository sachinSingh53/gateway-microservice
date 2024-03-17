
const jwt = require('jsonwebtoken');
const config = require('../config');
class AuthMiddleware {
    verifyUser(req,res,next){
        if(!req.session.jwt){
            throw new Error('Token is not available, please log in again');
        }

        try {
            const payload = jwt.verify(req.session.jwt,`${config.JWT_TOKEN}`);
            req.currentUser = payload;
        } catch (err) {
            throw new Error('Token is not available, please log in again');
        }

        next();
    }

    checkAuthentication(req,res,next){
        if(!req.currentUser){
            throw new Error('Authentication is requied to access this.');
        }
        next();
    }
}

const authMiddleware = new AuthMiddleware();

module.exports = authMiddleware;