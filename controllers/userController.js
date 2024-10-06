const User = require("../models/userModel");
const Slot = require("../models/slotModel");
const bcrypt = require("bcryptjs");

// Register User
exports.userRegistration = async (req, res) => {
  try {
    const { name, phoneNumber, age, pincode, aadharNo, password } = req.body;

    if (!name || !phoneNumber || !age || !pincode || !aadharNo || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userExists = await User.findOne({ phoneNumber });
    if (userExists) {
      return res.status(400).json({ message: "User already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in User Registration." });
  }
};

// Login User
exports.userLogin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res
        .status(400)
        .json({ message: "Phone number and password are required." });
    }

    const user = await User.findOne({ phoneNumber });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid User or Password" }); // Changed to 401 Unauthorized
    }

    res.status(200).json({ message: "Login successful", user }); // Include user info if needed
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in.", error });
  }
};

// View Available Slots
exports.availableSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required." });
    }

    const slots = await Slot.find({ date });
    if (slots.length === 0) {
      return res
        .status(404)
        .json({ message: "No slots available for the selected date." });
    }

    res.json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching available slots.", error });
  }
};

// Register for a Slot

exports.registerSlot = async (req, res) => {
  const { phoneNumber, date, time, doseType } = req.body; // Removed slotId

  try {
    if (!phoneNumber || !date || !time || !doseType) {
      return res.status(400).json({ message: "All fields are required." });
    }

    console.log("Request Body:", req.body);

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const parsedDate = new Date(date);
    console.log("Parsed Date:", parsedDate);

    const slot = await Slot.findOne({ date: parsedDate, time });
    console.log("Slot Found:", slot);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found." });
    }

    if (slot.availableDoses <= 0) {
      return res.status(400).json({ message: "No more doses are available." });
    }

    console.log("User Found:", user);
    console.log("Vaccination Status:", user.vaccinationStatus);

    if (doseType === "first") {
      if (user.vaccinationStatus !== "none") {
        return res
          .status(400)
          .json({ message: "User is not eligible for first dose." });
      }
      user.vaccinationStatus = "first";
    } else if (doseType === "second") {
      if (user.vaccinationStatus !== "first") {
        return res
          .status(400)
          .json({ message: "User is not eligible for second dose." });
      }
      user.vaccinationStatus = "completed";
    } else {
      return res.status(400).json({ message: "Invalid dose type." });
    }

    slot.availableDoses -= 1;

    await user.save();
    await slot.save();

    res.json({ message: "Slot registered successfully!" });
  } catch (error) {
    console.error("Error during slot registration:", error);
    res.status(500).json({
      message: "An error occurred while registering for the slot.",
      error,
    });
  }
};

//update slot

exports.updateSlot = async (req, res) => {
  const { phoneNumber, date, time, newDate, newTime } = req.body;

  try {
    if (!phoneNumber || !date || !time || !newDate || !newTime) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const originalDate = new Date(date); 
    const updatedDate = new Date(newDate); 
    const today = new Date(); 

    const timeDiff = originalDate - today;
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (timeDiff <= oneDayInMilliseconds) {
      return res.json({
        message: "You can only update the slot more than one day in advance.",
      });
    }

    const slot = await Slot.findOne({ date: originalDate, time });
    if (!slot) {
      return res.json({ message: "Slot not found." });
    }

    slot.date = updatedDate;
    slot.time = newTime;
    await slot.save();

    res.json({ message: "Slot updated successfully!" });
  } catch (error) {
    console.error(error);
    res.json({ message: "An error occurred while updating the slot.", error });
  }
};
