const Equber = require("../models/equberModel");
const { EquberBankAccount } = require("../models/bankAccountModel");
const Wallet = require("../models/walletModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
//login equber
const loginEquber = async (req, res) => {
  const { email, password } = req.body;

  try {
    const equber = await Equber.login(email, password);
    const token = await createToken(equber._id);
    const job = equber.job;
    const city = equber.city;
    const username = equber.username;
    const firstname = equber.first_name;
    const lastname = equber.last_name;
    const wallet_id = equber.wallet_id;

    res
      .status(200)
      .json({
        email,
        token,
        username,
        firstname,
        lastname,
        job,
        city,
        wallet_id,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup equber

const signupEquber = async (req, res) => {
  const {
    username,
    email,
    password,
    confirmPassword,
    first_name,
    last_name,
    age,
    job,
    phone_number,
    city,
    region,
  } = req.body;

  try {
    const equber = await Equber.signup(
      username,
      email,
      password,
      confirmPassword,
      first_name,
      last_name,
      age,
      job,
      phone_number,
      city,
      region
    );
    const token = await createToken(equber._id);
    const firstname = equber.first_name;
    const lastname = equber.last_name;

    res
      .status(200)
      .json({ email, username, token, firstname, lastname, job, city });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get equber
const getEquber = async (req, res) => {
  try {
    const equber = await Equber.findById(req.params.id);
    res.status(200).json(equber);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: error.message });
  }
};

// verify bank account
const verifyBankAccount = async (accountNumber, pinNumber) => {
  try {
    // Find the bank account with the given account number
    const bankAccount = await EquberBankAccount.findOne({
      account_number: accountNumber,
    });

    if (!bankAccount) {
      // Bank account with the given account number does not exist
      return false;
    }

    // Verify the pin number
    const isPinCorrect = bankAccount.pin == pinNumber;

    // console.log("Bank acconut",bankAccount.pin,pinNumber, isPinCorrect);

    if (!isPinCorrect) {
      // Incorrect pin number
      return false;
    }

    // Bank account and pin number are verified
    return true;
  } catch (error) {
    // Handle any errors that occur during the verification process
    console.error(error);
    throw new Error("Bank account verification failed.");
  }
};

// create wallet
const createWallet = async (req, res) => {
  const { bankName, accountNumber, pinNumber } = req.body;

  try {
    const owner_id = req.user._id; //retrieving sender id from req binded by auth middleware

    // console.log(bankName, accountNumber, pinNumber,owner_id);

    // Verify the bank account
    const isBankAccountVerified = await verifyBankAccount(
      accountNumber,
      pinNumber
    );

    if (!isBankAccountVerified) {
      return res
        .status(400)
        .json({ error: "Invalid bank account or pin number." });
    }
    console.log("the account verification is completed");
    // Bank account is verified, proceed with wallet creation
    const wallet = await Wallet.create({
      bankName,
      accountNumber,
      pinNumber,
      owner_id,
    });

    // Find the owner and assign the wallet_id
    const updateResult = await Equber.updateOne(
      { _id: owner_id },
      { wallet_id: wallet._id }
    );

    if (updateResult.nModified === 0) {
      // Unable to update the owner document
      throw new Error("Failed to assign wallet to the owner.");
    }
    console.log("Wallet created successfully.", wallet);

    res.status(200).json({ message: "Wallet created successfully.", wallet });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the wallet." });
  }
};

//get a wallet info for specific equber/user
const getWalletInfo = async (req, res) => {
  try {
    const owner_id = req.user._id;
    
    const wallet = await Wallet.findOne({owner_id});
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found." });
    }
    
    res.status(200).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signupEquber,
  loginEquber,
  getEquber,
  createWallet,
  getWalletInfo,
};
