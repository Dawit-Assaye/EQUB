const mongoose = require('mongoose');

const equbPayWinnerSchema = new mongoose.Schema({
  equbId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"Equb"
  },
  equbName: {
    type: String,
    required: true,
  },
  currentRound: {
    type: Number,
    required: true,
  },
  amountOfMoney: {
    type: Number,
    required: true,
  },
  recipientEquberId: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "Equber"
  },
  recipientEquberName: {
    type: String,
    required:true,
  },
  status: {
    type: String,
    required: true,
    default:"pending"
  }
});

const EqubPayWinner = mongoose.model('EqubPayWinner', equbPayWinnerSchema);

module.exports = EqubPayWinner;
