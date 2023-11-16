const express = require("express");
const connectDB = require("./config/connectDb");
const cors = require("cors");
require("dotenv").config();
const urlRouter = require("./routes/url.route");
const analyticsRouter = require("./routes/analytics.route");

connectDB();
const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/", urlRouter)
app.use("/analytics", analyticsRouter)

app.get("/", (req, res) => {
    const ip = req.ip;
    res.send({message: `Hello, ${ip}`});
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
