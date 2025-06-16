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
    const {userId,type,prompt,answers,options,exerciseId}=req.body;
    try{
        console.log(req.body);
        console.log(`database insertion start!!`);
        const prevData= await prisma.exercise.findUnique({
            where: { id:exerciseId }
        });
        console.log(prevData);
        let newType=(type) ? type : prevData.type;
        let newprompt=(prompt) ? prompt :prevData.prompt;
        let newanswers=(answers) ? answers: prevData.answers;
        let newoptions=(options) ? options: prevData.options;
        const lesson = await prisma.exercise.update({
            where: { id: exerciseId },
          data: {
              type :newType,
              options:newoptions,
              answers:newanswers,
              prompt:newprompt
            }
        });
        //  console.log('User created:', lesson);
        console.log(`exercise updated in db!!`);
        res.json({status:true});
    }
    catch(err){
        console.log(err);
        res.json({status:false});
    }

})


module.exports=router;