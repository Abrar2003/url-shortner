import { Request, Response, NextFunction } from 'express';
import ShortenedURL from '../models/url.model'; // Update the path accordingly

// Middleware function to check if the URL is expired
const isExpired = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const shortId = req.params.shortId; // Assuming the short ID is in the request parameters

    // Find the shortened URL in the database
    const url = await ShortenedURL.findOne({ short_id: shortId });

    // Check if the URL exists
    if (!url) {
      res.status(404).json({ error: 'URL not found' });
      return;
    }

    // Check if the URL is expired
    if (
      url.status === 'expired' ||
      (url.expiration_date && new Date() > url.expiration_date)
    ) {
      url.status = 'expired';
      await url.save();
      res.status(400).json({ error: 'URL has expired' });
      return;
    }

    // If the URL is active and not expired, continue with the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error checking URL expiration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default isExpired;
