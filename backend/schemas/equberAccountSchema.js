const mongoose=require("mongoose")
const Schema=mongoose.Schema;


const equberAccountSchema=new Schema({
    equber_name:{
      type:String,
      required:true
    },
    pin:{
      type:Number,
      required:true
    },
    account_number: {
        type: Number,
        required:true
      },
      balance: {
        type: Number,
        required:true
      },

      
   
},{timestamps:true})

module.exports=equberAccountSchema
