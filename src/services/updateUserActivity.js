let prisma;
const { PrismaClient } = require('../generated/prisma/client');
try{
    prisma = new PrismaClient();
}
catch(e){
 console.log(e);
}
require('dotenv').config();
const updateUserActivity=async (userId)=>{
    try{
        const userDetails= await prisma.userInfo.findUnique({
            where : { userId : userId }
        });
        const now =new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const last = new Date(userDetails.lastActivity.getFullYear(), userDetails.lastActivity.getMonth(), userDetails.lastActivity.getDate());
        const diffInDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));
        let newStreak=userDetails.currentStreak;
        if(diffInDays===1){
            newStreak++;
        }
        else{
            newStreak=1;
        }
        await prisma.userInfo.update({
            where: { userId : userId },
            data:{
                lastActivity: now,
                currentStreak: newStreak
            }
        });
        console.log(`updated user Activity !!`);
    }
    catch(err){
        console.log('error in userUpdateActivity!!!');
        console.log(err);
    }
}

module.exports=updateUserActivity;