const mongoose = require("mongoose");

const accessLog_Schema = new mongoose.Schema({
  url_id: { type: mongoose.Schema.Types.ObjectId, ref: "urls" },
  ip_address: { type: String, required: true },
  referer: { type: String, required: true },
});
