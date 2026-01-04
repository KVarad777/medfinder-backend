const express = require("express");
const router = express.Router();

const Medicine = require("../models/medicine");
const MedicalShop = require("../models/medicalshop");
const Order = require("../models/order"); // ensure this model exists

router.post("/", async (req, res) => {
  try {
    const { textCode } = req.body;

    if (!textCode) {
      return res.status(400).json({ status: "ERROR", message: "QR required" });
    }

    const medicine = await Medicine.findOne({ textCode });

    // ❌ CASE 4: FAKE MEDICINE
    if (!medicine) {
      return res.json({
        status: "FAKE",
        message: "QR not registered",
      });
    }

    const expiryDate = new Date(medicine.expiry_date);
    const today = new Date();
    const daysToExpiry = Math.ceil(
      (expiryDate - today) / (1000 * 60 * 60 * 24)
    );

    // 🟢 CASE 1: GENUINE & UNSOLD
    if (!medicine.is_selled) {
      return res.json({
        status: "GENUINE",
        medicine_name: medicine.medicine_name,
        brand_name: medicine.brand_name,
        batch_number: medicine.batch_number,
        expiry_date: medicine.expiry_date,
        days_to_expiry: daysToExpiry,
        manufactured_on: medicine.createdAt,
        message: "Medicine is authentic and unsold",
      });
    }

    // 🔍 If sold, find order
    const order = await Order.findOne({ medicineId: medicine._id });

    // 🔴 CASE 3: SOLD BUT NO ORDER → ILLEGAL
    if (!order) {
      return res.json({
        status: "ILLEGAL",
        message: "Medicine sold without legal record",
        medicine_name: medicine.medicine_name,
        selling_date_time: medicine.selling_date_time,
      });
    }

    // 🔍 Find shop
    const shop = await MedicalShop.findOne({ shopId: order.shopId });

    // 🟡 CASE 2: LEGALLY SOLD
    return res.json({
      status: "ALREADY_SOLD",
      medicine_name: medicine.medicine_name,
      brand_name: medicine.brand_name,
      batch_number: medicine.batch_number,
      expiry_date: medicine.expiry_date,
      days_to_expiry: daysToExpiry,
      sold_at: order.date,
      sold_to: order.customerName,
      shop_name: shop?.shopName || "Unknown",
      shop_address: shop?.address || "Unknown",
      shop_status: shop?.status || "unknown",
      message: "Medicine sold legally",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "ERROR", message: "Server error" });
  }
});

module.exports = router;
