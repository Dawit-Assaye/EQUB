const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const equberBankAccountSchema = new Schema({
  bank_name: {
    type: String,
    required:true
  },
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
        required: true,
        unique:true
      },
      balance: {
        type: Number,
        required:true
      },

      
   
}, { timestamps: true })

equberBankAccountSchema.statics.register=async function({bank_name,account_number,balance,equber_name,pin}){
  const equberAccount=await this.create({bank_name,account_number,balance,equber_name,pin})
    
  return equberAccount;
}


const EquberBankAccount= mongoose.model('EquberBankAccount', equberBankAccountSchema)
module.exports = {
  EquberBankAccount
}
      
      