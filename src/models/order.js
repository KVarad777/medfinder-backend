const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    shopId: String,
    customerName: String,
    customerMobile: String,
    medicineId: mongoose.Schema.Types.ObjectId,
    medicineName: String,
    soldItemsCount: Number,
    soldSubCodes: [String],
    date: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
