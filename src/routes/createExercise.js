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
    const {userId,type,prompt,options,answers,lessonId}=req.body;
    try{
        console.log(req.body);
        console.log(`database insertion start!!`);
        const exercise = await prisma.exercise.create({
          data: {
              type,
              prompt,
              options,
              answers,
              lessonId
            }
        });
         console.log('User created:', exercise);
        console.log(`user data aaded in db!!`);
        res.json({status:true});
    }
    catch(err){
        console.log(err);
        res.json({status:false});
    }

})


module.exports=router;