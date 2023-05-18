const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the creation request
const equbCreationRequestSchema = new Schema({
  sender_id: { type: mongoose.Schema.Types.ObjectId,ref:'Equber', required: true },
    equb_name: { type: String, required: true },
    equb_type: { type: String, required: true },
    equb_amount: { type: Number, required: true },
    equb_round: { type: Number, required: true },
  equb_starting_date: { type: String, required: true },
  request_status:{type:String,required:true,default:"Pending"}
});
module.exports=mongoose.model('EqubCreationRequest',equbCreationRequestSchema)