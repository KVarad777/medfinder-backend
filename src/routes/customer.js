const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");
const { generateToken } = require("../utils/jwt");

/**
 * SIGNUP CUSTOMER
 */
router.post("/signup", async (req, res) => {
  try {
    const { mobileNumber, name } = req.body;

    if (!mobileNumber || !name) {
      return res.status(400).json({
        success: false,
        message: "Mobile number and name required",
      });
    }

    const exists = await Customer.findOne({ mobileNumber });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Customer already exists",
      });
    }

    const customer = new Customer({ mobileNumber, name });
    await customer.save();

    res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * REQUEST OTP
 */
router.post("/request-otp", async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({ success: false, message: "Mobile required" });
    }

    const customer = await Customer.findOne({ mobileNumber });
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    customer.otp = otp;
    customer.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await customer.save();

    // ⚠️ TEMP (replace with SMS later)
    console.log("OTP for", mobileNumber, ":", otp);

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * VERIFY OTP + LOGIN + JWT
 */
router.post("/verify-otp", async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    const customer = await Customer.findOne({ mobileNumber });

    if (
      !customer ||
      customer.otp !== otp ||
      customer.otpExpiresAt < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    customer.otp = null;
    customer.otpExpiresAt = null;
    await customer.save();

    const token = generateToken(customer._id);

    res.json({
      success: true,
      token,
      customer: {
        name: customer.name,
        mobileNumber: customer.mobileNumber,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
