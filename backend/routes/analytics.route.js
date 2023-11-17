const express = require("express");
const Analytics = require("../models/accessLog.model");
const { getURLAnalytics,  getAllVisitors  } = require('../controllers/analytics.controller');
const Router = express.Router();

Router.get('/:short_id', getURLAnalytics);

Router.get('/visitors/:short_id', getAllVisitors);


module.exports = Router;