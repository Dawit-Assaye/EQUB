const express=require('express')
const router=express.Router()

//controller functions
const{signupEquber,loginEquber}=require('../controllers/equberControllers')

//login
router.post('/login',loginEquber)

//signup
router.post('/signup',signupEquber)

module.exports=router