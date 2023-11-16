const mongoose = require("mongoose");

const url_Schema = new mongoose.Schema(
  {
    original_url: { type: String, required: true },
    short_id: { type: String, required: true, unique: true },
    expiration_date: { type: Date },
    starting_date: { type: Date, default: Date.now() },
    app_id: { type: mongoose.Schema.Types.ObjectId },
    title: String,
    description: String,
    status: {
      type: String,
      enum: ["active", "expired", "draft"],
      default: "active",
    },
    stats: { total_visitor: { type: Number, default: 0 } },
  },
  { timestamps: true }
);

module.exports = mongoose.model("urls", url_Schema);
