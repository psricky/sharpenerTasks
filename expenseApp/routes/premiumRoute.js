const express=require('express')
const router=express.Router()
const  premiumController  = require('../controller/premiumController')
const authMiddleware = require('../middleware/auth');
router.get('/show-leaderboard', authMiddleware.authenticate, premiumController.getLeaderboard);

module.exports = router;