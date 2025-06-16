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

router.post('/',async(req,res)=>{
    const {username,password,email}=req.body;
    try{
        console.log(req.body);
        
        console.log(`database insertion start!!`);
        //password needs to be hashed before db insertion in production.
        const user = await prisma.user.create({
          data: {
              email: email,
              username: username,
              password: password,
              userInfo: {
                create: {}
               }
            }
        });
         console.log('User created:', user);
        console.log(`user data aaded in db!!`);
        let payload=user.id;
        let sessionToken=jwt.sign(payload,process.env.JWTKEY);
        res.cookie("sessionToken",sessionToken,{
            httpOnly:false,
            maxAge:9000000,
            path:'/',
            secure:true,
            sameSite:'none'
        });
        console.log(`cookie send!!`);
        res.json({status:true});
    }
    catch(err){
        console.log(err);
        res.json({status:false});
    }

})


module.exports=router;