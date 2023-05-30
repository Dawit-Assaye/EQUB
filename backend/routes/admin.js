const express=require('express')
const router=express.Router()

//controller functions
const{signupAdmin,loginAdmin}=require('../controllers/adminControllers')

//login
router.post('/login',loginAdmin)

//signup
router.post('/signup', signupAdmin)

module.exports=router