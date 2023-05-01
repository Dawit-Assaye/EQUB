const express=require('express')
const router=express.Router()
const {createEquber,createEqub}=require('../controllers/accountControllers')


router.post('/create/equber',createEquber)
router.post('/create/equb',createEqub)

module.exports=router