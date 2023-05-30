const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true,
    unique:true
  },
  pinNumber: {
    type: String,
    required: true
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equber", // Assuming Equber is the model name for the owner
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default:0
  },
  totalRotated: {
    type: Number,
    required: true,
    default:0
  }
});

module.exports = mongoose.model("Wallet", walletSchema);

