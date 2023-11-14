const express = require("express");
const Analytics = require("../models/accessLog.model");

const Router = express.Router();

Router.get("/", (req, res) => {
    res.send("Hello ANALYTICCS")
});

module.exports = Router;