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
    const {userId,answers,exerciseId}=req.body;
    try{
        console.log(req.body);
        console.log(`database insertion start!!`);
        const exerciseDetail=await prisma.exercise.findUnique({
            where:{ id : exerciseId }
        });
        console.log(exerciseDetail.answers);
        console.log(answers);
        if(exerciseDetail.answers[0]===answers[0]){
            const Correctexist=await prisma.exerciseAttempt.findMany({
                where:{ userId , exerciseId , isCorrect:true},
                select:{ id: true }
            });
            if(Correctexist.length===0){
                 const exerciseAttempt = await prisma.exerciseAttempt.create({
                        data: {
                        userId,
                        exerciseId,
                        isCorrect:true,
                        xpAwarded:10
                    }
                   });
                 await prisma.userInfo.update({
                    where: { userId },
                    data: {
                        xp:{
                            increment:10
                        }
                    }
                 });
            }
            else{
                const exerciseAttempt = await prisma.exerciseAttempt.create({
                        data: {
                        userId,
                        exerciseId,
                        isCorrect:true,
                        xpAwarded:0
                    }
                   });
            }
        }
        else{
            const exerciseAttempt = await prisma.exerciseAttempt.create({
                        data: {
                        userId,
                        exerciseId,
                        isCorrect:false,
                        xpAwarded:0
                    }
                   });
        }
        checkCurrentLesson(exerciseId,userId);
        console.log(`user data aaded in db!!`);
        res.json({status:true});
    }
    catch(err){
        console.log(err);
        res.json({status:false});
    }

})

const checkCurrentLesson= async(exerciseId,userId)=>{
    try{

        const lessonDetails= await prisma.exercise.findUnique({
            where: { id: exerciseId }
        });
        console.log(lessonDetails.lessonId);
        const lessonCompleted= await prisma.lessonCompletion.findUnique({
            where : { userId_lessonId : {userId , lessonId: lessonDetails.lessonId}}
        });
        if(lessonCompleted){
            console.log(`lesson completed !!`);
        }
        else{
            console.log(`to be checked !!`);
            const allExercises= await prisma.exercise.findMany({
                where : { lessonId: lessonDetails.lessonId },
                select : { id :true }
            });
            let all= allExercises.map( e => e.id );
            const allAttempted= await prisma.exerciseAttempt.findMany({
                where: { userId , xpAwarded : 10 },
                select : { exerciseId : true }
            });
            let toCheck=allAttempted.map( e => e.exerciseId  );
            if(all.length===toCheck.length){
                console.log(`lesson completed !!`);
                await prisma.lessonCompletion.create({
                    data : {
                        userId,
                        lessonId: lessonDetails.lessonId,

                    }
                });
            }
            else{
                console.log(`lesson not completed !!`);
            }
        }
    }
    catch(e){
        console.log(e);
    }

}

module.exports=router;