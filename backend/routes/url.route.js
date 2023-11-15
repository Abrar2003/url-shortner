const express = require("express");
const URL = require("../models/url.model");

const { shortenURL, redirectToOriginalURL, updateURL  } = require('../controllers/url.controller');

const Router = express.Router();

Router.get("/", test_url_controller);


Router.post('/short', shortenURL);

Router.get('/:shortId', redirectToOriginalURL);

Router.put('/update/:shortId', updateURL);

module.exports = Router;