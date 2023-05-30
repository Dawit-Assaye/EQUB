const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

    payer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    payer_name: {
        type: String,
        required:true
    },
    payee_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    payee_name:{
        type: String,
        required:true
    },
    amount: {
        type: Number,
        required:true
    },
    round: {
        type: Number,
        required:true
    }
});

module.exports = mongoose.model("Transaction", transactionSchema);

