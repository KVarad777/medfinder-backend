const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },

    // 🔐 OTP
    otp: String,
    otpExpiresAt: Date,

    orderIds: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
