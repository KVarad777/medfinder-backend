const express = require("express");
const router = express.Router();
const MedicalShop = require("../models/medicalshop");

/**
 * GET VERIFIED MEDICAL SHOPS
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
