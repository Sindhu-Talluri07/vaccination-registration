const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// user registration
router.post("/register", userController.userRegistration);

// user login
router.post("/login", userController.userLogin);

// view available slots
router.get("/slots", userController.availableSlots);

// register for a slot
router.post("/book-slot", userController.registerSlot);

//update your slot
router.put("/manage-slot", userController.updateSlot);

module.exports = router;
