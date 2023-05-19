const { EquberBankAccount}=require("../models/bankAccountModel")


const createEquberBankAccount=async (req,res)=>{
const {bank_name,account_number,balance,equber_name,pin}=req.body
try{
await  EquberBankAccount.register({bank_name,account_number,balance,equber_name,pin})
res.status(200).json({account_number,balance,equber_name,pin,bank_name})
}catch(error){
    res.status(400).json({error:error.message})
}
}


// deposit to a bank account
const depositToEquberBankAccount = async (req,res)=>{
    const {account_number,amount,bank_name } = req.body
    
    try {
        // Find the account with the given account_number and update the balance
        const updatedAccount = await EquberBankAccount.findOneAndUpdate(
        { account_number, bank_name },
          { $inc: { balance: amount } }, // Increment the balance by the given amount
          { new: true } // Return the updated document
        );
    
        if (!updatedAccount) {
          return res.status(404).json({ message: "Account not found." });
        }
    
        // Return the updated account details or a success message
        return res.status(200).json({ message: "Amount deposited successfully.", account: updatedAccount });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
      }
}

// withdraw from an account
const withdrawFromEquberBankAccount = async (req, res) => {
    const { bank_name,account_number, amount } = req.body;
  
    try {
      // Find the account
      const account = await EquberBankAccount.findOne({ account_number, bank_name });
  
      if (!account) {
        return res.status(404).json({ message: "Account not found." });
      }
  
      // Check if the account balance is sufficient for withdrawal
      if (account.balance < amount) {
        return res.status(400).json({ message: "Insufficient account balance." });
      }
  
      // Update the account balance by subtracting the amount
      account.balance -= amount;
  
      // Save the updated account
      const updatedAccount = await account.save();
  
      // Return the updated account details or a success message
      return res.status(200).json({ message: "Amount withdrawn successfully.", account: updatedAccount });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
    }
};
  
// get account info

const getAccountInfo = async (req, res) => {
    const { bank_name, account_number, equber_name } = req.body;
  
    try {
      // Find the account matching the provided bank name, account number, and Equber name
      const account = await EquberBankAccount.findOne({
        bank_name,
        account_number,
        equber_name
      });
  
      if (!account) {
        return res.status(404).json({ message: "Account not found." });
      }
  
      // Return the account details
      return res.status(200).json({ account });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };
  
  

    module.exports = {
        createEquberBankAccount,
        depositToEquberBankAccount,
        withdrawFromEquberBankAccount,
        getAccountInfo
      };
      