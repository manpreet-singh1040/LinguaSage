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

router.get('/',async(req,res)=>{
    const {userId}=req.body;
    try{
        console.log(req.body);
        console.log(`database read start!!`);
        const userInfo = await prisma.user.findUnique({
            where:{ id:userId},
            select:{ 
                email:true,
                username:true,
                createdAt:true,
                userInfo:true,
                completions:true,
                attempts:true
             }
        });
        console.log(userInfo);
        res.json({status:true,data:userInfo});
    }
    catch(err){
        console.log(err);
        res.json({status:false});
    }

})


module.exports=router;