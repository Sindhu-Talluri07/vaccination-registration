const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  registeredSlotDate: Date,
  registeredSlotTime: String,
  age: {
    type: Number,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  aadharNo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  vaccinationStatus: {
    type: String,
    enum: ["none", "first", "completed"],
    default: "none",
  },
});
module.exports = mongoose.model("User", userSchema);
