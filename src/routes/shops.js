const express = require("express");
const router = express.Router();
const MedicalShop = require("../models/medicalshop");

/**
 * GET ALL MEDICAL SHOPS (ANY STATUS)
 */
router.get("/", async (req, res) => {
  try {
    const shops = await MedicalShop.find();
    res.json(shops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
