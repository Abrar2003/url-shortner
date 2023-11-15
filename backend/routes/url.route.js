const express = require("express");
const URL = require("../models/url.model");


const Router = express.Router();
const { test_URL_Controller, new_sort_url, getShortUrlsByAppId,deleteShortUrl } = require("../controllers/url.controller");

// Router.get("/", test_URL_Controller);
// Router.post("/short", new_sort_url);

// New route to get short URLs by App Id
Router.get("/appId", getShortUrlsByAppId);

Router.delete("/delete/:shortId", deleteShortUrl);

module.exports = Router;