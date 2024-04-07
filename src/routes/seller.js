import express from 'express';
import authMiddleware from '../services/auth-middleware.js';
import { id, random, username } from '../controllers/user/seller/get.js';
import { seller } from '../controllers/user/seller/create.js';
import{seller as updateSeller} from '../controllers/user/seller/update.js'
import{seller as seedSeller} from '../controllers/user/seller/seed.js'

const router = express.Router();

router.get('/seller/id/:sellerId',authMiddleware.verifyUser,authMiddleware.checkAuthentication,id)
router.get('/seller/username/:username',authMiddleware.verifyUser,authMiddleware.checkAuthentication,username);
router.get('/seller/random/:count',authMiddleware.verifyUser,authMiddleware.verifyUser,random); 
router.post('/seller/create',authMiddleware.verifyUser,authMiddleware.verifyUser,seller); 
router.put('/seller/:sellerId',authMiddleware.verifyUser,authMiddleware.verifyUser,updateSeller); 
router.post('/seller/seed/:count',authMiddleware.verifyUser,authMiddleware.verifyUser,seedSeller); 


export default router;
