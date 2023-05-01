const {EquberAccount,EqubAccount}=require("../models/accountModel")


const createEquber=async (req,res)=>{
const {account_number,balance,equber_name,pin}=req.body
try{
await EquberAccount.register({account_number,balance,equber_name,pin})
res.status(200).json({account_number,balance,equber_name,pin})
}catch(error){
    res.status(400).json({error:error.message})
}
}

const createEqub=async (req,res)=>{
    const {account_number,balance,equb_name}=req.body
    try{
    await EqubAccount.register({account_number,balance,equb_name})
    res.status(200).json({account_number,balance,equb_name})
    }catch(error){
        res.status(400).json({error:error.message})
    }
    }
    module.exports = {
        createEquber,
        createEqub,
      };
      