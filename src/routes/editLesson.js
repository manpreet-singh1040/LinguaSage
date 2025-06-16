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
    const {userId,title,level,topic,lessonId}=req.body;
    try{
        console.log(req.body);
        console.log(`database insertion start!!`);
        const prevData= await prisma.lesson.findUnique({
            where: { id:lessonId }
        });
        console.log(prevData);
        let newTitle=(title) ? title : prevData.title;
        let newTopic=(topic) ? topic :prevData.topic;
        let newLevel=(level) ? level: prevData.level;
        const lesson = await prisma.lesson.update({
            where: { id: lessonId },
          data: {
              topic :newTopic,
              title:newTitle,
              level:newLevel
            }
        });
        //  console.log('User created:', lesson);
        console.log(`lesson updated in db!!`);
        res.json({status:true});
    }
    catch(err){
        console.log(err);
        res.json({status:false});
    }

})


module.exports=router;