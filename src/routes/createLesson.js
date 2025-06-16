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

router.post('/',async(req,res)=>{
    const {userId,title,level,topic}=req.body;
    try{
        console.log(req.body);
        console.log(`database insertion start!!`);
        const lesson = await prisma.lesson.create({
          data: {
              topic,
              title,
              level
            }
        });
         console.log('User created:', lesson);
        console.log(`user data aaded in db!!`);
        res.json({status:true});
    }
    catch(err){
        console.log(err);
        res.json({status:false});
    }

})


module.exports=router;