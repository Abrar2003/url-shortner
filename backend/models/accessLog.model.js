const mongoose = require("mongoose");

const accessLog_Schema = new mongoose.Schema({
  url_id: { type: mongoose.Schema.Types.ObjectId, ref: "urls" },
  ip_address: { type: String, required: true },
  visit_time: {type: Date}
});

module.exports = mongoose.model("logs", accessLog_Schema);