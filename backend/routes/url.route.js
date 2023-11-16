const express = require("express");
const URL = require("../models/url.model");

const { shortenURL, redirectToOriginalURL, updateURL, getShortUrlsByAppId, deleteShortUrl } = require('../controllers/url.controller');

const Router = express.Router();

// GET: all short URLs by App Id
Router.get("/appid", getShortUrlsByAppId);

//DELETE: delete the short url by shortID
Router.delete("/delete/:shortId", deleteShortUrl);

//POST: Create new Short url
Router.post('/short', shortenURL);

//GET: Redirect to the original url by shortID
Router.get('/:shortId', redirectToOriginalURL);

//PUT: update url details by shortID
Router.put('/update/:shortId', updateURL);
module.exports = Router;