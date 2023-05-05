const Equber = require("../models/equberModel");
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
    const username=equber.username;
    const firstname=equber.first_name;
    const lastname=equber.last_name;

    res.status(200).json({ email, token,username,firstname,lastname });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};

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
    region } = req.body;

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
      region);
    const token = await createToken(equber._id);

    res.status(200).json({ email, username,token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupEquber,
  loginEquber,
};
