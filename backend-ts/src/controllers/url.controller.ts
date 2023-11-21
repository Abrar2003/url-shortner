
import { Request, Response } from 'express';
import validator from 'validator';
import URL from '../models/url.model';
import Log from '../models/accessLog.model';
import dotenv from 'dotenv';

dotenv.config();

import {
  findExistingURL,
  generateUniqueShortID,
  getExpirationDate,
  createNewURL,
} from '../services/createUrl.service';

const DOMAIN: string | undefined = process.env.DOMAIN;
const PORT: number | undefined = process.env.PORT ? parseInt(process.env.PORT, 10) : undefined;

const shortenURL = async (req: Request, res: Response): Promise<void> => {
  //console.log(DOMAIN)
  try {
    const { original_url, expiration_date, title, description } = req.body;

    // Validate the original_url
    if (!validator.isURL(original_url)) {
      res.status(400).json({ error: 'Invalid URL format' });
      return;
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const redirectToOriginalURL = async (req: Request, res: Response): Promise<void> => {
  try {
    const { shortId } = req.params;
    const ip_address = req.ip;

    const referrer = req.headers.referer || req.headers.referrer || null;
    console.log('referrer', referrer);

    // Check for Invalid shortId
    if (!validator.isAlphanumeric(shortId)) {
      res.status(400).json({ error: 'Invalid shortId format' });
      return;
    }

    // Find the URL in the database using the short_id
    const url = await URL.findOne({ short_id: shortId });

    if (!url) {
      res.status(404).json({ error: 'URL not found' });
      return;
    }

    // Handling Expired URLs
    if (url.expiration_date && new Date(url.expiration_date) < new Date()) {
      // Update the status to 'expired'
      url.status = 'expired';
      await url.save();

      res.status(400).json({ error: 'URL has expired' });
      return;
    }

    const log = await Log.create({
      url_id: url._id,
      ip_address,
      visit_time: Date.now(),
    });

    // Redirect to the original URL
    res.redirect(url.original_url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateURL = async (req: Request, res: Response): Promise<void> => {
  try {
    const { shortId } = req.params;
    const updateFields = req.body;

    // Handling Non-Existing URLs
    const url = await URL.findOne({ short_id: shortId });
    if (!url) {
      res.status(404).json({ error: 'URL not found' });
      return;
    }

    // Update the fields in the database
    for (const [key, value] of Object.entries(updateFields)) {
              // Explicitly cast to any if needed
              (url as any)[key] = value;
            }

    // Save the updated URL
    await url.save();

    // Return the updated fields in the response
    res.json(updateFields);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getShortUrlsByAppId = async (req: Request, res: Response): Promise<void> => {
  try {
    // const { app_id } = req.query;
    const { page } = req.query;

    const pageSize = 10; // Adjust the page size as needed
    //   const result = await URL.getByAppId(app_id, page, pageSize);

    const result = await URL.find()
    .skip(((page as unknown) as number - 1) * pageSize)
    .limit(pageSize);
    res.send(result);
  } catch (error) {
    console.error('Error fetching URLs by App Id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to delete short URL by shortId
const deleteShortUrl = async (req: Request, res: Response): Promise<void> => {
  const { shortId } = req.params;

  try {
    const deletedUrl = await URL.findOneAndDelete({ short_id: shortId });

    if (deletedUrl) {
      res.json({
        success: true,
        message: 'URL deleted successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'URL not found',
      });
    }
  } catch (error) {
    console.error('Error deleting URL by shortId:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export {
  shortenURL,
  redirectToOriginalURL,
  updateURL,
  getShortUrlsByAppId,
  deleteShortUrl,
};
