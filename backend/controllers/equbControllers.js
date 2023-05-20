const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;

const EqubCreationRequest = require("../models/equbCreationRequestModel");
const EqubJoinRequest=require("../models/equbJoinRequestModel")
const Equb=require("../models/equbModel")

// create equbCreateRequest
const equbCreationRequest = async (req, res) => {
  const { equb_name, equb_type, equb_amount, equb_round, equb_starting_date } =
    req.body;

  // // handling an error
  let emptyField = [];

  if (!equb_name) {
    emptyField.push("equb_name");
  }
  if (!equb_type) {
    emptyField.push("equb_type");
  }
  if (!equb_amount) {
    emptyField.push("equb_amount");
  }
  if (!equb_round) {
    emptyField.push("equb_round");
  }
  if (!equb_starting_date) {
    emptyField.push("equb_starting_date");
  }
  if (emptyField.length > 0) {
    res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyField });
    return;
  }

  try {
    const sender_id = req.user._id; // Retrieve sender id from req bound by auth middleware
    const equbCreationRequest = await EqubCreationRequest.create({
      equb_name,
      equb_type,
      equb_amount,
      equb_round,
      equb_starting_date,
      sender_id
    });
    res.status(200).json({
      message: "Your request is submitted successfuly",
      data: equbCreationRequest,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//create equbJoinRequest

const equbJoinRequest = async (req, res) => {
  
  const { equb_name, equb_type, equb_amount, equb_round, equb_starting_date,equb_id } =
    req.body;
  
  try {
    const sender_id = req.user._id; //retrieving sender id from req binded by auth middleware
    const equbJoinRequest = await EqubJoinRequest.create({
      equb_name,
      equb_type,
      equb_amount,
      equb_round,
      equb_starting_date,
      equb_id,
      sender_id
    });
    res.status(200).json({
      message: "Your request is submitted successfuly",
      data: equbJoinRequest,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};


//getEqubCreationRequests

const getEqubCreationRequests = async (req, res) => {
  try {
    const equbCreationRequests = await EqubCreationRequest.find();
    res.status(200).json(equbCreationRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//getEqubJoinRequests

const getEqubJoinRequests = async (req, res) => {
  try {
    const equbGetRequests = await EqubJoinRequest.find();
    res.status(200).json(equbGetRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



//update creationrequests status
const updateCreationRequestStatus = async (req, res) => {
  const { request_status } = req.body;
  try {
    const equbCreationRequest = await EqubCreationRequest.findByIdAndUpdate(req.params.id, { $set: { request_status:request_status } }, { new: true });
    if (!equbCreationRequest) {
      return res.status(404).json({ error: 'Equb not found' });
    }
    res.status(200).json(equbCreationRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Internal server error' });
  }
}


//update joinrequests status
const updateJoinRequestStatus = async (req, res) => {
  const { request_status } = req.body;
  try {
    const equbJoinRequest = await EqubJoinRequest.findByIdAndUpdate(req.params.id, { $set: { request_status:request_status } }, { new: true });
    if (!equbJoinRequest) {
      return res.status(404).json({ error: 'Equb not found' });
    }
    res.status(200).json(equbJoinRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Internal server error' });
  }
}

//delete equbCreationRequests
const deleteEqubCreationRequests = async (req, res) => {
  
  try {
    // Find the request by ID and delete
    const request = await EqubCreationRequest.findByIdAndDelete(req.params.id);

    // If the request is not found, return an error response
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }



    // Return a success response
    res.json({ message: 'Request deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the request' });
  }
};



// create equb
const createEqub = async (req, res) => {

  const {
    equb_name,
    type,
    amount,
    max_round,
    starting_date,
    sender_id } = req.body;
  try {

      // Check if sender_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(sender_id)) {
        return res.status(400).json({ error: 'Invalid sender_id' });
      }
    
    const equb = await Equb.createEqub(
      equb_name,
      type,
      amount,
      max_round,
      starting_date,
      sender_id
    );
    
    res.status(200).json({
      message: "Your equb is created successfuly",
      data: equb,
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//Get equbs
const getEqubs = async (req, res) => {
  try {
    const equbs = await Equb.find().sort({ createdAt: 1 }).limit(4);
    res.status(200).json(equbs);
  } catch (error) {
    res.status(400).json({ error: "cann't get equbs" })
  }
};


//Get specific equb
const getEqub = async (req, res) => {
  const equbId = req.params.id;
  try {
    const equb = await Equb.findById(equbId);
    if (!equb) {
      return res.status(404).json({ error: "Equb not found" });
    }
    res.json(equb);
  } catch (error) {
    res.status(400).json({ error: "Error retrieving Equb" });
  }
};


//Get joined equbs
const getJoinedEqubs = async (req, res) => {
  const member_id = req.params.id;
  console.log('hhhhheeeeyyy');
  console.log("joined person",member_id);
  try {
    const joinedEqubs = await Equb.find({ members: { $in: [member_id] } }).sort({ createdAt: 1 });
    res.status(200).json(joinedEqubs);
  } catch (error) {
    res.status(400).json({ error: "cann't get joined equbs" })
  }
}

//add sender to a member of the equb

const addSenderToMember=async (req, res) => {
  try {
    // const { equbId } = req.params;
    const { member_id,equb_id } = req.body;

    //find and update the field by using mongoose
    await Equb.updateOne({ _id: equb_id }, { $push: { members: new ObjectId(member_id) } });


    // // Find the equb by its ID
    // const equb = await Equb.findById(equb_id);

    // console.log('The founded equb',equb);
    // if (!equb) {
    //   return res.status(404).json({ error: 'Equb not found' });
    // }

    // // Add the user as a member to the equb
    // equb.members.push(new ObjectId(member_id));
    // await equb.save();

    res.status(200).json({ message: 'Member added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { equbCreationRequest,equbJoinRequest,getEqubCreationRequests,getEqubJoinRequests,createEqub,updateJoinRequestStatus,updateCreationRequestStatus,deleteEqubCreationRequests,getEqubs,getEqub,getJoinedEqubs,addSenderToMember};
