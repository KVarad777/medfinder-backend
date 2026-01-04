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

module.exports = router;
