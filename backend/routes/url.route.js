const express = require("express");
const URL = require("../models/url.model");

const Router = express.Router();

Router.get("/", (req, res) => {
    res.send("Hello URL")
});

module.exports = Router;