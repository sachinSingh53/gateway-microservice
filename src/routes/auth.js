import express from 'express';
import { create } from '../controllers/auth/signup.js';
import { read } from '../controllers/auth/signin.js';
import { verifyEmail } from '../controllers/auth/verifyEmail.js';
import { changePassword, forgotPassword, resetPassword } from '../controllers/auth/password.js';

const router = express.Router();

router.post('/auth/signup', create);
router.post('/auth/signin', read);
router.put('/auth/verify-email', verifyEmail);
router.put('/auth/forgot-password', forgotPassword);
router.put('/auth/reset-password/:token', resetPassword);
router.put('/auth/change-password', changePassword);
// router.get('/check',(req,res)=>{
//     res.send('working fine');
// })

export default router;
