const express = require("express");
const router = express.Router();
const Medicine = require("../models/medicine");
const MedicalShop = require("../models/medicalshop");

router.post("/", async (req, res) => {
  try {
    const { textCode } = req.body;

    const med = await Medicine.findOne({ textCode });

    if (!med) {
      return res.json({
        status: "FAKE",
        message: "QR code not found in system",
      });
    }

    // Calculate days to expiry
    const today = new Date();
    const expiry = new Date(med.expiry_date);
    const daysToExpiry = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    // NOT SOLD
    if (!med.is_selled) {
      return res.json({
        status: "GENUINE",
        message: "Medicine is genuine and not sold",
        medicine_name: med.medicine_name,
        brand_name: med.brand_name,
        batch_number: med.batch_number,
        expiry_date: med.expiry_date,
        days_to_expiry: daysToExpiry,
      });
    }

    // SOLD → fetch shop
    const shop = await MedicalShop.findOne({
      shopId: med.medical_shop_id,
    });

    return res.json({
      status: "ALREADY_SOLD",
      message: "Medicine already sold",
      medicine_name: med.medicine_name,
      brand_name: med.brand_name,
      batch_number: med.batch_number,
      expiry_date: med.expiry_date,
      days_to_expiry: daysToExpiry,
      sold_at: med.selling_date_time,
      sold_to: med.customer_name,
      shop_name: shop?.shopName ?? "Unknown",
      shop_address: shop?.address ?? "Unknown",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
