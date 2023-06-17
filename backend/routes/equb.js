const express=require('express')
//controller functions
const {equbCreationRequest,equbJoinRequest,getEqubCreationRequests,getEqubJoinRequests,getEqubWinnerPaymentRequests,deleteEqubWinnerPaymentRequests,updateEqubWinnerPaymentRequestsStatus,equbWinnerPayment,createEqub,deleteEqub,getEqubs,getEqub,getJoinedEqubs,addSenderToMember, updateJoinRequestStatus,updateCreationRequestStatus,deleteEqubCreationRequests,payForEqub,getWinner,getCandidates}=require('../controllers/equbControllers')
const requireAuth=require('../middlewares/requireAuth');


const router=express.Router();

//Require auth for all routes

router.use(requireAuth)

//POST a new equb creation request with data to waitlist
router.post('/requests/create', equbCreationRequest)

//Post a new equb join request with sender and equb data 
router.post('/requests/join',equbJoinRequest)

//GET all equb creation request with data 
router.get('/requests/create/all', getEqubCreationRequests)

//GET all equb join request with data 
router.get('/requests/join/all', getEqubJoinRequests)

//Update creation request's status
router.put('/requests/:id', updateCreationRequestStatus)
//Update creation request's status
router.put('/requests/join/:id', updateJoinRequestStatus)  

//Delete equb creation requests
router.delete('/requests/:id',deleteEqubCreationRequests)

//Create equb
router.post('/create', createEqub)

//Get all equbs
router.get('/all', getEqubs)

//Get specific equb
router.get('/:id',getEqub)

//Delete specific equb
router.delete('/:id',deleteEqub)

//Get joined equbs
router.get('/joined/:id',getJoinedEqubs)

//Post add sender as a member
router.post('/add/members', addSenderToMember)   

//Post pay for equb
router.post('/pay', payForEqub)

//Get winner of the equb
router.get('/winner/:id', getWinner)

//Get candidates of the equb to that round
router.get('/candidates/:id',getCandidates)

//Get equb winner payment requests
router.get('/winner/payment/requests', getEqubWinnerPaymentRequests)

//delete Equb Winner Payment Requests
router.delete('/winner/payment/requests/:id',deleteEqubWinnerPaymentRequests)

//Update creation request's status
router.put('/winner/payment/requests/:id', updateEqubWinnerPaymentRequestsStatus)  

//post pay equb winner
router.post('/winner/payment', equbWinnerPayment)  

//Put Assign the role of the sender to a member of the equity


// //GET single equb
// router.get('/:id',getWorkout)


// //DELETE a equb
// router.delete('/:id',deleteWorkout)

// //PATCH/UPDATE a equb
// router.patch('/:id',updateWorkout)

module.exports=router