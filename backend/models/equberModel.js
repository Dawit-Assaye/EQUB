const mongoose = require("mongoose");
const equberSchema=require('../schemas/equberSchema')
// const virtualBankDBConnection=require("../connections/virtualDBConnection");


module.exports = mongoose.model("Equber", equberSchema);
