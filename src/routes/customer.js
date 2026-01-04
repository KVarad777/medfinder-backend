const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");

/**
 * LOGIN CUSTOMER
 */
router.post("/login", async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    const customer = await Customer.findOne({ mobileNumber });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      customer,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/**
 * SIGNUP CUSTOMER
 */
router.post("/signup", async (req, res) => {
  try {
    const { mobileNumber, name } = req.body;

    if (!mobileNumber || !name) {
      return res.status(400).json({
        success: false,
        message: "Mobile number and name are required",
      });
    }

    const existing = await Customer.findOne({ mobileNumber });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Customer already exists",
      });
    }

    const customer = new Customer({ mobileNumber, name });
    await customer.save();

    res.status(201).json({
      success: true,
      customer,
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/**
 * GET CUSTOMER BY ID
 */
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
