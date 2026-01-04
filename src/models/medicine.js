const mongoose = require("mongoose");

const subTextSchema = new mongoose.Schema(
  {
    code: String,
    status: {
      type: String,
      enum: ["active", "sold", "damaged", "expired"],
      default: "active",
    },
  },
  { _id: false }
);

const medicineSchema = new mongoose.Schema(
  {
    medicine_name: String,
    brand_name: String,
    batch_number: String,
    expiry_date: Date,

    type: {
      type: String,
      enum: ["single", "strip"],
    },

    textCode: {
      type: String,
      unique: true,
      required: true,
    },

    subTextCodes: {
      type: [subTextSchema],
      default: [],
    },

    medical_shop_name: String,
    medical_shop_id: String,
    is_selled: {
      type: Boolean,
      default: false,
    },
    selling_date_time: Date,
    customer_name: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);
