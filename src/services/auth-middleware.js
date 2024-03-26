const jwt = require('jsonwebtoken');
const config = require('../config');
const { NotAuthorizedError } = require('../../../9-jobber-shared/src/errors');
class AuthMiddleware {

    verifyUser(req,res,next){
        if(!req.session.jwt){
            throw new NotAuthorizedError('Token is not available. Please login again.', 'GatewayService verifyUser() method error')
        }
        try {
            const payload = jwt.verify(req.session.jwt,`${config.JWT_TOKEN}`);
            req.currentUser = payload;
        } catch (err) {
            throw new NotAuthorizedError('Token is not available. Please login again.', 'GatewayService verifyUser() method invalid session error');
        }
        next();
    }

    checkAuthentication(req,res,next){
        if(!req.currentUser){
            throw new NotAuthorizedError('Authentication is required to access this route.', 'GatewayService checkAuthentication() method error');
        }
        next();
    }
}

const authMiddleware = new AuthMiddleware();

module.exports = authMiddleware;