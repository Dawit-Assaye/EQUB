const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    requried: true,
    },
},{timestamps:true});


adminSchema.statics.signup = async function (
    email, 
    password,
    first_name,
    last_name,
    ) {
        const exists = await this.findOne({ email });
      
        // validation
        if (!email || !password) {
          throw Error("All fields must be filled");
        }
      
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
      
        const admin = await this.create({ 
          email, 
          password: hash,
          first_name,
          last_name,
        });
        return admin;
      };
      
      adminSchema.statics.login = async function (email, password) {
        if (!email || !password) {
          throw Error("All fields must be filled");
        }
        const admin = await this.findOne({ email });
        if (!admin) {
          throw Error("Incorrect email");
        }
        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
          throw Error("Incorrect password");
        }
        return admin;
      };
      
      
      module.exports = mongoose.model("Admin", adminSchema);
      