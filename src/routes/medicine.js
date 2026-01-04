const router = require("express").Router();
const Medicine = require("../models/medicine");

/**
 * SEARCH MEDICINES (autocomplete)
 */
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q || "";

    const medicines = await Medicine.find({
      medicine_name: { $regex: q, $options: "i" }
    })
      .limit(10)
      .select("medicine_name brand_name");

    res.json(medicines);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * SHOPS HAVING A MEDICINE
 */
router.get("/:name/shops", async (req, res) => {
  try {
    const meds = await Medicine.find({
      medicine_name: req.params.name,
      is_selled: false,
    });

    res.json(meds);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});
/**
 * RESERVE A MEDICINE
 */
router.post("/reserve", async (req, res) => {
  try {
    const { medicine_name, customer_name } = req.body;

    if (!medicine_name || !customer_name) {
      return res.json({
        success: false,
        message: "Medicine name and customer required",
      });
    }

    // Find one available unit
    const medicine = await Medicine.findOne({
      medicine_name,
      is_selled: false,
    });

    if (!medicine) {
      return res.json({
        success: false,
        message: "Medicine out of stock",
      });
    }

    medicine.is_selled = true;
    medicine.customer_name = customer_name;
    medicine.selling_date_time = new Date();

    await medicine.save();

    res.json({
      success: true,
      message: "Medicine reserved successfully",
      medicine,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
/**
 * GET STOCK OF A SHOP
 */
router.get("/shop/:shopId", async (req, res) => {
  try {
    const meds = await Medicine.find({
      medical_shop_id: req.params.shopId,
      is_selled: false,
    });

    res.json(meds);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
