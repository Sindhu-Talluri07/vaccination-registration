const User = require("../models/userModel");
const Slot = require("../models/slotModel");

//  Total Users with Filters
exports.TotalUsers = async (req, res) => {
  const filters = {};

  if (req.query.age) filters.age = req.query.age;

  if (req.query.pincode) filters.pincode = req.query.pincode;

  if (req.query.vaccinationStatus) {
    filters.vaccinationStatus =
      req.query.vaccinationStatus === "all"
        ? { $in: ["none", "first", "completed"] }
        : req.query.vaccinationStatus;
  }

  try {
    const users = await User.find(filters);
    if (users.length === 0) {
      return res.json({ message: "No users found." });
    }
    const userlength = users.length;
    res.json({ totalusers: userlength });
  } catch (error) {
    console.error(error);
    res.json({
      message: "Cannot fetch users"
    });
  }
};

// Check Registered Slots
exports.checkSlots = async (req, res) => {
  const { date, doseType } = req.query;

  try {
    const query = { date: new Date(date) };
    if (doseType) {
      query.doseType = doseType;
    }

    const slots = await Slot.find(query);

    if (slots.length === 0) {
      return res.json({ message: "No slots found." });
    }

    res.json(slots);
  } catch (error) {
    console.error(error);
    res.json({ message: "An error while fetching registered slots." });
  }
};
