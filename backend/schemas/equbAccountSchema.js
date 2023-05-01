const mongoose=require("mongoose")
const Schema=mongoose.Schema;


const equbAccountSchema=new Schema({
    equb_name:{
      type:String,
      required:true
    },
    account_number: {
        type: Number,
        required:true
        // unique:true
      },
      balance: {
        type: Number,
        required:true
      },

      
   
},{timestamps:true})

module.exports=equbAccountSchema
