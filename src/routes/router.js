const expres=require('express');
const router=expres.Router();
const authMiddleware=require('../middlewares/auth');
const updateActivityMiddleware=require('../middlewares/updateActivity');
const signupRoute=require('./signup');
const loginRoute=require('./login');
const createLessonRoute=require('./createLesson');
const createExerciseRoute=require('./createExercise');
const viewLessonsRoute=require('./viewLesson');
const attemptExcersiseRoute=require('./attempt');
const userDetailsRoute=require('./userDetails');
const editLessonRoute=require('./editLesson');
const editExerciseRoute=require('./editExercise');
const leaderboardRoute=require('./leaderboard');

router.use('/leaderboard', leaderboardRoute);
router.use('/auth/editexercise' , authMiddleware , editExerciseRoute);
router.use('/auth/editlesson', authMiddleware , editLessonRoute);
router.use('/auth/userdetails', authMiddleware , updateActivityMiddleware , userDetailsRoute);
router.use('/auth/attempt', authMiddleware , updateActivityMiddleware, attemptExcersiseRoute);
router.use('/auth/viewlessons', authMiddleware , updateActivityMiddleware, viewLessonsRoute);
router.use('/auth/createexercise', authMiddleware , updateActivityMiddleware, createExerciseRoute);
router.use('/auth/createlesson', authMiddleware , updateActivityMiddleware, createLessonRoute);
router.use('/signup',signupRoute);
router.use('/login',loginRoute);

router.get('/',(req,res)=>{
    console.log('hello !!');
    res.json({mes:"hello"});
});
module.exports = router;