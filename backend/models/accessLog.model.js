const mongoose = require("mongoose");

const accessLog_Schema = new mongoose.Schema({
  url_id: { type: mongoose.Schema.Types.ObjectId, ref: "urls" },
  ip_address: { type: String, required: true },
  referer: { type: String, required: true },
});

<<<<<<< HEAD
module.exports = mongoose.model("logs", accessLog_Schema);
=======
module.exports = mongoose.model("logs", accessLog_Schema)
>>>>>>> ada68c0d7ae42842bc33b5a41ed0fc2edbf56c04
