const express = require('express');
const router = express.Router();

router.get('/gateway-health',(req,res)=>{
    res.status(200).send('API gateway is healthy and running');
})

module.exports = router;