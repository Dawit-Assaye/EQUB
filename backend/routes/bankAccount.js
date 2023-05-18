const express=require('express')
const router=express.Router()
const {createEquberBankAccount}=require('../controllers/bankAccountControllers')


router.post('/create/equber',createEquberBankAccount)

module.exports=router