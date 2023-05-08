const express=require('express')
//controller functions
const {equbCreationRequest}=require('../controllers/equbControllers')
const requireAuth=require('../middlewares/requireAuth');


const router=express.Router();

//Require auth for all routes
router.use(requireAuth)

//POST a new equb creation request with data to waitlist
router.post('/',equbCreationRequest)

// //GET all equbs
// router.get('/',getWorkouts)

// //GET single equb
// router.get('/:id',getWorkout)


// //DELETE a equb
// router.delete('/:id',deleteWorkout)

// //PATCH/UPDATE a equb
// router.patch('/:id',updateWorkout)

module.exports=router