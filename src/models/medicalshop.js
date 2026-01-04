const mongoose = require("mongoose");

const medicalShopSchema = new mongoose.Schema(
  {
    shopName: String,
    ownerName: String,
    mobile: String,
    address: String,
    openingTime: String,
    closingTime: String,
    openDays: [String],
    location: {
      latitude: Number,
      longitude: Number,
    },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    shopId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MedicalShop", medicalShopSchema);
