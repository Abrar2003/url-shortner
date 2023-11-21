import URL from '../models/url.model';
import shortid from 'shortid';

const findExistingURL = async (original_url: string) => {
  return await URL.findOne({ original_url });
};

const generateUniqueShortID = async () => {
  let short;
  do {
    short = shortid.generate();
  } while (await URL.exists({ short }));
  return short;
};

const getExpirationDate = (expiration_date: string | undefined | null) => {
  if (expiration_date) {
    // Set expiration_date to the end of the day
    const date = new Date(expiration_date);
    date.setHours(23, 59, 59, 999);
    return date;
  }
  return null;
};

// Inside createNewURL function
const createNewURL = (
  original_url: string,
  short_id: string,
  expirationDate: string | undefined | null | Date,
  title: string | undefined,
  description: string | undefined
) => {
  // Check if the URL has expired
  const isExpired = expirationDate && new Date(expirationDate) < new Date();

  return new URL({
    original_url,
    short_id,
    starting_date: Date.now(),
    expiration_date: isExpired
      ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
      : expirationDate
        ? new Date(expirationDate)
        : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Set default to 1 year if not provided
    title,
    description,
    status: isExpired ? 'expired' : 'active',
  });
};

export { findExistingURL, generateUniqueShortID, getExpirationDate, createNewURL };

