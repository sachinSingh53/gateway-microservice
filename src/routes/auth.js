import express from 'express';
import { create } from '../controllers/auth/signup.js';
import { read } from '../controllers/auth/signin.js';

const router = express.Router();

router.post('/auth/signup', create);
router.post('/auth/signin', read);
// router.get('/check',(req,res)=>{
//     res.send('working fine');
// })

export default router;
