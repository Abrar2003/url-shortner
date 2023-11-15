const express = require("express");
const URL = require("../models/url.model");
const { test_url_controller } = require("../controllers/url.controller");

const Router = express.Router();

Router.get("/", test_url_controller);

module.exports = Router;