import express from 'express';
import { read, resendEmail } from '../controllers/auth/currentUser.js';
import authMiddleware from '../services/auth-middleware.js';
import { token } from '../controllers/auth/reftesh-token.js';
const router = express.Router();

router.get('/auth/currentuser',authMiddleware.verifyUser,authMiddleware.checkAuthentication, read);
router.post('/auth/resend-email',authMiddleware.verifyUser,authMiddleware.checkAuthentication, resendEmail );
router.get('/auth/refresh-token/:username',authMiddleware.verifyUser,authMiddleware.checkAuthentication, token );

// router.get('/check',(req,res)=>{
//     res.send('working fine');
// })

export default router;
