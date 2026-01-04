const express = require("express");
const router = express.Router();
const MedicalShop = require("../models/medicalshop");

/**
 * ✅ GET ALL MEDICAL SHOPS (verified + pending + rejected)
 */
router.get("/all", async (req, res) => {
  try {
    const shops = await MedicalShop.find();
    res.json(shops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ✅ GET ONLY VERIFIED SHOPS (existing feature)
 */
router.get("/verified", async (req, res) => {
  try {
    const shops = await MedicalShop.find({ status: "verified" });
    res.json(shops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
