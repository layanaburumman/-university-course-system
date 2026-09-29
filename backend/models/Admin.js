const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
); // ينشئ تلقائياً وقت إنشاء الحساب وتحديثه

module.exports = mongoose.model("Admin", AdminSchema);
