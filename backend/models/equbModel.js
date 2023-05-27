const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const Schema = mongoose.Schema;

// Define the schema for equb
const equbSchema = new Schema({
  equb_name: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: async function (name) {
    //     const equb = await this.constructor.findOne({
    //       equb_name: { $regex: new RegExp(`^${name}$`, "i") },
    //     });
    //     return !equb;
    //   },
    //   message: (props) => `${props.value} already exists!`,
    // },
  },
  type: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  max_round: {
    type: Number,
    required: true
  },
  starting_date: {
    type: Date,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Equber"
  }],
  winners: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Equber"
  }],
  contributed_equbers: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Equber"
  }],
  refundable_equbers: [{
    equber: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Equber"
    },
    round: {
      type: Number,
      required: false
    }
  }],
  status: {
    type: String,
    required: true,
    default: "active"
  },
  current_round: {
    type: Number,
    required: true,
    default:1
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  last_winner: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Equber"
  },
  payment_date: {
    type: Date,
    required: true,
    default: function () {
      const paymentDate = new Date(this.starting_date.getTime() + 1 * 24 * 60 * 60 * 1000); // Add 1 day in milliseconds
      return paymentDate;
    },
  },
  lottery_date: {
    type: Date,
    required: true,
    default: function () {
      const lotteryDate = new Date(this.starting_date.getTime() + 3 * 12 * 60 * 60 * 1000); // Add 1 day and half in milliseconds
      return lotteryDate;
    },
  },
  last_lottery_date: {
    type: Date,
    required: true,
    default: function () {
      const lastLotteryDate = new Date(this.lottery_date.getTime() - 3 * 24 * 60 * 60 * 1000);//minus 3 days from the current lottery date
      return lastLotteryDate;
    }
  }
  
});

// // Create a unique index on the equb_name field with case-insensitive collation
// equbSchema.index({ equb_name: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

// Register a new equb
equbSchema.statics.createEqub = async function (
  equb_name,
  type,
  amount,
  max_round,
  starting_date,
  sender_id
) {


  try {
    // Create a new equb object with the given properties
    const equb = await this.create({
      equb_name,
      type,
      amount,
      max_round,
      starting_date,
      members: [new ObjectId(sender_id)],// Convert sender_id to ObjectId and add the sender to a member of equb
      current_round: 1, // start with the first round
      balance: 0, // set the initial balance to 0
      
    });
    return equb;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to register equb ");

  }
};

module.exports = mongoose.model("Equb", equbSchema);
