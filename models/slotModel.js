const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slotId:{
    type:String,
  },
  date: {
      type: Date,
      required: true,
      index: true 
  },
  
  time: {
    type: String,
    required: true,
  },
  availableDoses: {
    type: Number,
    default: 10,
  }
});

module.exports = mongoose.model("Slot", slotSchema);