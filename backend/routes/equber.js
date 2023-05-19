const express=require('express')
const router=express.Router()
const requireAuth = require('../middlewares/requireAuth');

//controller functions
const{signupEquber,loginEquber,getEquber,createWallet,getWalletInfo,depositToWallet,withdrawFromWallet}=require('../controllers/equberControllers')

//signup
router.post('/signup', signupEquber)

//login
router.post('/login',loginEquber)


// get single equber
router.get('/:id', getEquber)

router.use(requireAuth)

//post a new wallet
router.post('/wallet/create', createWallet)

//get wallet information
router.get('/wallet/info', getWalletInfo)

//post deposit to a wallet from bank
router.post('/wallet/deposit', depositToWallet)

//post withdraw from wallet to bank
router.post('/wallet/withdraw', withdrawFromWallet)


module.exports=router