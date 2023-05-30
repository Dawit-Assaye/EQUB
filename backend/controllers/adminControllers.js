// require('dotenv').config();
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
//login admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.login(email, password);
    const token = await createToken(admin._id);
    const firstname=admin.first_name;
    const lastname=admin.last_name;

      
    res.status(200).json({ email, token,firstname,lastname });
} catch (error) {
  res.status(400).json({ error: error.message });
}



};

//signup admin
const signupAdmin = async (req, res) => {
    const { 
      email, 
      password,
      first_name,
      last_name,
      key
    } = req.body;

    //checking authorization to be registered
    if (key != process.env.KEY) {
        res.status(400).json({ error: "Sorry,you are not authorized to be an admin" })
        return
    }
    
    try {
      const admin = await Admin.signup(
      email, 
      password,
      first_name,
      last_name,
      );
      const token = await createToken(admin._id);
        const firstname = admin.first_name;
        const lastname = admin.last_name;
        
      res.status(200).json({ email,token,firstname,lastname });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
module.exports = {
    signupAdmin,
    loginAdmin,
  };