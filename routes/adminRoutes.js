const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Route to get total users
router.get("/slots/users", adminController.TotalUsers);
router.get("/slots/checkslots", adminController.checkSlots);

module.exports = router;
