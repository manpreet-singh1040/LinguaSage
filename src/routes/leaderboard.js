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
    const {limit,bottom}=req.query;
    try{
        console.log(` limit --> ${limit} bottom --> ${bottom}`);
        console.log(`database read start!!`);
        let lim=(limit)? (parseInt(limit)) : 10;
        const leaderboard = await prisma.user.findMany({
           orderBy:{
            userInfo:{
                xp: (bottom==="true") ? "asc":"desc"
            }
           },
           take :lim,
           select:{
            id:true,
            username:true,
            email:true,
            userInfo:{
                select:{
                    xp:true,
                    currentStreak:true
                }
            }
           }
        })
        console.log(leaderboard);
        res.json({status:true,data:leaderboard});
    }
    catch(err){
        console.log(err);
        res.json({status:false});
    }

})


module.exports=router;