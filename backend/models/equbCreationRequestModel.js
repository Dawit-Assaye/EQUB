const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the creation request
const equbCreationRequestSchema = new Schema({
  sender_id: { type: String, required: true },
    equb_name: { type: String, required: true },
    equb_type: { type: String, required: true },
    equb_amount: { type: Number, required: true },
    equb_round: { type: Number, required: true },
    equb_starting_date: {type:Date,required:true}
});
module.exports=mongoose.model('EqubCreationRequest',equbCreationRequestSchema)