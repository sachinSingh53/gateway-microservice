const express = require('express');
const router = express.Router({});
const authController = require('../controllers/auth/signup')



router.post('/auth/signup',authController.create);

// router.get('/check',(req,res)=>{
//     res.send('working fine');
// })

module.exports = router;