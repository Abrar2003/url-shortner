const express = require("express");
const URL = require("../models/url.model");
const { shortenURL, redirectToOriginalURL  } = require('../controllers/url.controller');

const Router = express.Router();

Router.get("/", (req, res) => {
    res.send("Hello URL")
});


Router.post('/short', shortenURL);

Router.get('/:shortId', redirectToOriginalURL);

module.exports = Router;