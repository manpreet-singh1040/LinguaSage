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
        const lessons = await prisma.lesson.findMany({
            include :{ 
                exercises:true,
                completions:{
                    where :{ userId }
                }
             }
        })
        console.log(lessons);
        res.json({status:true,data:lessons});
    }
    catch(err){
        console.log(err);
        res.json({status:false});
    }

})


module.exports=router;