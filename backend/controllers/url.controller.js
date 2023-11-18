const validator = require("validator");
const URL = require("../models/url.model");
const Log = require("../models/accessLog.model");
const  { findExistingURL, generateUniqueShortID, getExpirationDate, createNewURL } = require("../services/createUrl.service")

const DOMAIN = process.env.DOMAIN;
const PORT = process.env.PORT;


const shortenURL = async (req, res) => {
  try {
    const { original_url, expiration_date, title, description } = req.body;

    // Validate the original_url
    if (!validator.isURL(original_url)) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    const existing_url = await findExistingURL(original_url);

    if (existing_url) {
      console.log("existing");
      return res.json({
        short_url: `${DOMAIN}/${existing_url.short_id}`,
      });
    }

    // Generate a unique short_id
    const short_id = await generateUniqueShortID();

    const expirationDate = getExpirationDate(expiration_date);

    // Create a new URL entry in the database
    const url = createNewURL(original_url, short_id, expirationDate, title, description);

    await url.save();

    res.json({ short_url: `${DOMAIN}/${short_id}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const redirectToOriginalURL = async (req, res) => {
  try {
    const { shortId } = req.params;
    const ip_address = req.ip;

    const referrer = req.headers.referer || req.headers.referrer || null;
    console.log("referrer", referrer);

    // Find the URL in the database using the short_id
    const url = await URL.findOne({ short_id: shortId });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }
    const log = await Log.create({
      url_id: url._id,
      ip_address,
      visit_time: Date.now(),
    });
    // Handling Expired URLs
    if (url.expiration_date && new Date(url.expiration_date) < new Date()) {
      return res.status(400).json({ error: "URL has expired" });
    }

    // Redirect to the original URL
    res.redirect(url.original_url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateURL = async (req, res) => {
  try {
    const { shortId } = req.params;
    const updateFields = req.body;

    // Handling Non-Existing URLs
    const url = await URL.findOne({ short_id: shortId });
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    // Update the fields in the database
    for (const [key, value] of Object.entries(updateFields)) {
      url[key] = value;
    }

    // Save the updated URL
    await url.save();

    // Return the updated fields in the response
    res.json(updateFields);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getShortUrlsByAppId = async (req, res) => {
  // const { app_id } = req.query;
  const { page } = req.query;

  try {
    const pageSize = 10; // Adjust the page size as needed
    //   const result = await URL.getByAppId(app_id, page, pageSize);

    const result = await URL.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.send(result);
  } catch (error) {
    console.error("Error fetching URLs by App Id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to delete short URL by shortId
const deleteShortUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const deletedUrl = await URL.findOneAndDelete({ short_id: shortId });

    if (deletedUrl) {
      res.json({
        success: true,
        message: "URL deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }
  } catch (error) {
    console.error("Error deleting URL by shortId:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  shortenURL,
  redirectToOriginalURL,
  updateURL,
  getShortUrlsByAppId,
  deleteShortUrl,
};
