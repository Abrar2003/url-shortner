const URL = require("../models/url.model");
const shortid = require("shortid");


const findExistingURL = async (original_url) => {
    return await URL.findOne({ original_url, status: 'active' });
  };
  
  const generateUniqueShortID = async () => {
    let short;
    do {
      short = shortid.generate();
    } while (await URL.exists({ short }));
    return short;
  };
  
  const getExpirationDate = (expiration_date) => {
    if (expiration_date) {
      // Set expiration_date to the end of the day
      const date = new Date(expiration_date);
      date.setHours(23, 59, 59, 999);
      return date;
    }
    return null;
  };
  
  const createNewURL = (original_url, short_id, expiration_date, title, description) => {
    return new URL({
      original_url,
      short_id,
      starting_date: Date.now(),
      expiration_date: expiration_date,
      title,
      description,
    });
  };

  module.exports = { findExistingURL, generateUniqueShortID, getExpirationDate, createNewURL }