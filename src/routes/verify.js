const express = require("express");
const router = express.Router();
const Medicine = require("../models/medicine");

// POST /api/verify-qr
router.post("/", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { textCode } = req.body;

    if (!textCode) {
      return res.status(400).json({ status: "INVALID" });
    }

    const medicine = await Medicine.findOne({ textCode });

    if (!medicine) {
      return res.json({ status: "INVALID" });
    }

    if (medicine.is_selled) {
      return res.json({
        status: "ALREADY_SOLD",
        medicine: {
          medical_shop_name: medicine.medical_shop_name,
          selling_date_time: medicine.selling_date_time,
        },
      });
    }

    return res.json({
      status: "GENUINE",
      medicine: {
        medicine_name: medicine.medicine_name,
        brand_name: medicine.brand_name,
        batch_number: medicine.batch_number,
        expiry_date: medicine.expiry_date,
      },
    });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({ status: "ERROR" });
  }
});

module.exports = router;
