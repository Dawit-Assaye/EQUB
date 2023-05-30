const express=require('express')
const router=express.Router()
const {createEquberBankAccount,depositToEquberBankAccount,withdrawFromEquberBankAccount,getAccountInfo}=require('../controllers/bankAccountControllers')

// create a bank account
router.post('/create/equber', createEquberBankAccount)

//deposit money to an account
router.post('/deposit', depositToEquberBankAccount)

//withdraw from an account
router.post('/withdraw', withdrawFromEquberBankAccount)

//get account information
router.get('/info',getAccountInfo)

module.exports=router