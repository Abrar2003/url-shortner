const express = require("express");
const Analytics = require("../models/accessLog.model");
const { getURLAnalytics,  getAllVisitors  } = require('../controllers/analytics.controller');
const Router = express.Router();

Router.get('/:shortId', getURLAnalytics);

Router.get('/visitors/:shortId', getAllVisitors);


module.exports = Router;