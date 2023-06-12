const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;

const EqubCreationRequest = require("../models/equbCreationRequestModel");
const EqubJoinRequest=require("../models/equbJoinRequestModel")
const Equb = require("../models/equbModel")
const Equber = require("../models/equberModel")
const Transaction = require("../models/transactionModel")
const Wallet=require('../models/walletModel');
const EqubPayWinner = require("../models/equbPayWinnerModel");

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
      message: "Your equb creation request is submited successfuly",
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
    const equbs = await Equb.find().sort({ createdAt: 1 });
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
    
    if (joinedEqubs) {
      res.status(200).json(joinedEqubs);
    }
  } catch (error) {
    res.status(400).json({ error: "cann't get joined equbs" })
  }
}

//add sender to a member of the equb

const addSenderToMember = async (req, res) => {
  try {
    const { member_id, equb_id } = req.body;

    // Find the equb by its ID
    const equb = await Equb.findById(equb_id);

    if (!equb) {
      return res.status(404).json({ error: 'Equb not found' });
    }

    // Check if the member is already a part of the equb
    if (equb.members.includes(member_id)) {
      return res.status(400).json({ error: 'Member is already part of the equb' });
    }

    // Add the member to the equb
    equb.members.push(member_id);
    await equb.save();

    res.status(200).json({ message: 'Member added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Post pay for equb

const payForEqub = async (req, res) => {
  const { userId, equbId } = req.body;

  try {
    
    // Retrieve the equb and user data from the database
    const equb = await Equb.findById(new ObjectId(equbId));
    const equber = await Equber.findById(new ObjectId(userId));
    const equberWallet = await Wallet.findById(equber.wallet_id)
    
   // Check if the last payment date is equal to today
   const lastPaymentDate = equb.last_payment_date;
   const currentDate = new Date();
   const isLastPaymentToday = lastPaymentDate.toDateString() === currentDate.toDateString();

   if (isLastPaymentToday) {
     throw new Error("Last payment date is equal to today. Payment is not allowed.");
   }
    
    // Check if equb status is not completed
    if (equb.status === "completed") {
      throw new Error("Payment is not allowed for completed equbs.");
    }
    
    // Check if payment date has passed
    if (currentDate > equb.payment_date) {
      throw new Error("Payment date has passed.");
    }
    
    // Check if user is in refundable equbers list
    if (equb.refundable_equbers.includes(userId)) {
      throw new Error("User is in the refundable equbers list.");
    }
    
    // Check if user's balance is sufficient to pay the equb amount
    if (equberWallet.balance < equb.amount) {
      throw new Error("Insufficient balance.");
    }

    // Check if a transaction exists with the provided equb name, equber ID, and round
     const existingTransaction = await Transaction.findOne({
      payer_id: userId,
      payee_id: equbId,
      round: equb.current_round,
    });
    
    if (existingTransaction) {
      throw new Error("Payment for this round has already been made.");
    }
    
    // Decrement user's wallet balance and increment equb's balance
    equberWallet.balance -= equb.amount;
    equb.balance += equb.amount;
    
    // Push user's ID to the contributed list of the equb
    equb.contributed_equbers.push(userId);

    // Create the transaction object
    const transaction = new Transaction({
      payer_id: userId,
      payee_id: equbId,
      payer_name: `${equber.first_name} ${equber.last_name}`,
      payee_name:equb.equb_name,
      amount: equb.amount,
      round: equb.current_round,
    });

    // Save the updated user, equb, and transaction data
    await equber.save();
    await equb.save();
    await transaction.save();
    await equberWallet.save();
    
    res.status(200).json({ message: "Payment successful." });
  } catch (error) {
    console.log('error',error);
    res.status(400).json({ error: error.message });
  }
};

//Get winner of the equb
const getWinner = async (req, res) => {
  const equbId = req.params.id;
  try {
    const equb = await Equb.findById(new ObjectId(equbId));//populat("current_winner")
    const winnerId = equb.last_winner
    //equb.current_winner.firstName for frontend
    const winner=await Equber.findById(new ObjectId(winnerId))
    if (winner) {
      res.status(200).json({
        message: `The winner is ${winner.first_name}`,
        data: winner,
      });
 }
  } catch (error) {
    console.log('error',error);
    res.status(400).json({ error: error.message });
  }
}

//get candidatess for an equb
const getCandidates = async (req, res) => {
  const equbId = req.params.id;
  try {
    const equb = await Equb.findById(new ObjectId(equbId));
    const candidateIds = equb.last_contributed_equbers;
    const candidates = await Promise.all(
      candidateIds.map(async (candidateId) => {
        return await Equber.findById(new ObjectId(candidateId));
      })
    );
    if (candidates) {
      res.status(200).json(candidates);
    }
  } catch (error) {
    console.log('error', error);
    res.status(400).json({ error: error.message });
  }
};

//get Equb winner payment requests 
const getEqubWinnerPaymentRequests = async (req, res) => {
  try {
    const equbPayWinnerRequests = await EqubPayWinner.find();
    res.status(200).json(equbPayWinnerRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


//delete equbPayWinnerRequests
const deleteEqubWinnerPaymentRequests = async (req, res) => {
  
  try {
    // Find the request by ID and delete
    const request = await EqubPayWinner.findByIdAndDelete(req.params.id);

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


//update equbPayWinnerRequests status
const updateEqubWinnerPaymentRequestsStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const equbPayWinnerRequests = await EqubPayWinner.findByIdAndUpdate(req.params.id, { $set: { status:status } }, { new: true });
    if (!equbPayWinnerRequests) {
      return res.status(404).json({ error: 'Equb not found' });
    }
    res.status(200).json(equbPayWinnerRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Internal server error' });
  }
}

const equbWinnerPayment = async (req, res) => {
  const { equbId, currentRound, amountOfMoney, recipientEquberId } = req.body;
  try {
    // Search for the equb by ID
    const equb = await Equb.findById(equbId);
    if (!equb) {
      console.log('NOt Equb HERE');
      return res.status(404).json({ error: 'Equb not found' });
    }

    // Search for the equber by ID
    const equber = await Equber.findById(recipientEquberId);
    if (!equber) {
      console.log('NOt Equber HERE');
      return res.status(404).json({ error: 'Equber not found' });
    }

    
    // Update the equber's wallet balance
    const walletId = equber.wallet_id; // Assuming the equber object has a walletId property
    const wallet = await Wallet.findById(walletId);
    if (!wallet) {
      console.log('NOt Wallet HERE');
      return res.status(404).json({ error: 'Wallet not found' });
    }

    // Update the equb's balance
    equb.balance -= amountOfMoney;
    
    wallet.balance += amountOfMoney;

    // Save the updated equb and wallet
    await equb.save();
    await wallet.save();

    // Create a new transaction object
    const transaction = new Transaction({
      payer_name: equb.equb_name,
      payer_id: equb._id,
      round: currentRound,
      amount: amountOfMoney,
      payee_id: equber._id,
      payee_name:`${equber.first_name} ${equber.last_name}`
    });


    // Save the transaction
    await transaction.save();

    res.status(200).json({ message: 'Payment successful' });
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ error: 'Unable to pay winner' });
  }
};


module.exports = { equbCreationRequest,equbJoinRequest,getEqubCreationRequests,getEqubJoinRequests,getEqubWinnerPaymentRequests,deleteEqubWinnerPaymentRequests,updateEqubWinnerPaymentRequestsStatus,equbWinnerPayment,createEqub,updateJoinRequestStatus,updateCreationRequestStatus,deleteEqubCreationRequests,getEqubs,getEqub,getJoinedEqubs,addSenderToMember,payForEqub,getWinner,getCandidates};
