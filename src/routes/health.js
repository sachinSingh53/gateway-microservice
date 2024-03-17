const express = require('express');
const router = express.Router();

router.get('/gateway-health',(req,res)=>{
    res.status(200).send('API gateway health is Healthy');
})

module.exports = router;