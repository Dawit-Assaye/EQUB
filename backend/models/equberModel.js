const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const equberSchema = new Schema({
  username:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword:{
    type:String,
    required:true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    requried: true,
  },
  age: {
    type: Number,
    required:true
  },
  job: {
    type: String,
    required:true
  },
  phone_number:{
    type:Number,
    required:true
  },
  city: {
    type: String,
    
  },
  region: {
    type: String,
    
  },

  // address: {
  //   type: addressSchema,
  //   required:true
  // },
  wallet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    required: false,
 }
},{timestamps:true});
const bcrypt = require("bcrypt");
const validator = require("validator");



equberSchema.statics.signup = async function (
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
) {
  const exists = await this.findOne({ email });

  // validation
  // if (!email || !password) {
  //   throw Error("All fields must be filled");
  // }

  // if (!validator.isEmail(email)) {
  //   throw Error("Email is not valid");
  // }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error("Password is not enough strong");
  // }

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const equber = await this.create({ 
    username,
    email, 
    password: hash,
    confirmPassword,
    first_name,
    last_name,
    age,
    job,
    phone_number,
    city,
    region
  });
  return equber;
};

equberSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const equber = await this.findOne({ email });
  if (!equber) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, equber.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return equber;
};


module.exports = mongoose.model("Equber", equberSchema);
