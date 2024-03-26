import express from 'express';
import { create as createAuth } from '../controllers/auth/signup.js';

const router = express.Router();

router.post('/auth/signup', createAuth);

// router.get('/check',(req,res)=>{
//     res.send('working fine');
// })

export default router;
