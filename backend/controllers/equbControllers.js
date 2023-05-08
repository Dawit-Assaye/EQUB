const EqubCreationRequest = require("../models/equbCreationRequestModel");

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
    const sender_id = req.user._id; //retrieving sender id from req binded by auth middleware
    const equbCreationRequest = await EqubCreationRequest.create({
      equb_name,
      equb_type,
      equb_amount,
      equb_round,
      equb_starting_date,
      sender_id,
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
module.exports = { equbCreationRequest };
