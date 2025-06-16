let prisma;
const { PrismaClient } = require('../generated/prisma/client');
try{
    prisma = new PrismaClient();
}
catch(e){
 console.log(e);
}

require('dotenv').config();
const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const updateUserActivity=require('../services/updateUserActivity');

router.post('/',async (req,res)=>{
    let body=req.body;
    try{
        console.log(req.body);
        let data=await prisma.user.findUnique({
            where : { email: body.email }
        });
        console.log(`data from the db`);
        console.log(data);
        //password needs to be hashed before comparing as db stores hashed passwords in production
        if(data.password!== body.password)
        {
            throw new Error(`password not matched!!`);
        }
        let payload=data.id;
        console.log(` payload ${payload}`);
        let sessionToken=jwt.sign(payload,process.env.JWTKEY);
        res.cookie("sessionToken",sessionToken,{
            httpOnly:false,
            maxAge:9000000,
            path:'/',
            secure:true,
            sameSite:'none',
        });
        // console.log(data);
        updateUserActivity(data.id);
        console.log(`cookie send!!`);
        res.json({status:true});
    }
    catch(err){
        console.log("invalid username and password!!");
        console.log(err);
        res.json({status:false});
    }
})

module.exports = router
