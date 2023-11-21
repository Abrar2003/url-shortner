import { Request, Response, NextFunction } from "express";
import ShortenedURL from "../models/url.model"; // Update the path accordingly
import validator from "validator";
import { findExistingURL } from "../services/createUrl.service";

// Middleware function to check if the URL is expired
export const isExpired = async (
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
      res.status(404).json({ error: "URL not found" });
      return;
    }

    // Check if the URL is expired
    if (
      url.status === "expired" ||
      (url.expiration_date && new Date() > new Date(url.expiration_date))
    ) {
      url.status = "expired";
      await url.save();
      res.status(400).json({ error: "URL has expired" });
      return;
    }

    // If the URL is active and not expired, continue with the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error checking URL expiration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const check_expire = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const DOMAIN = process.env.DOMAIN;
  const { original_url } = req.body;
  console.log("check expire")
  try {
    // Validate the original_url
    if (!validator.isURL(original_url)) {
      res.status(400).json({ error: "Invalid URL format" });
      return;
    }

    const existing_url = await findExistingURL(original_url);

    if (existing_url) {
      console.log("existing", existing_url)
      if (
        existing_url.status === "expired" ||
        (existing_url.expiration_date &&
          new Date() > new Date(existing_url.expiration_date))
      ) {
        console.log("expired");
        existing_url.expiration_date = new Date(
          Date.now() + 365 * 24 * 60 * 60 * 1000
        );
        existing_url.status = "active";
        await existing_url.save();
        res.json({
          short_url: `${DOMAIN}/${existing_url.short_id}`,
        });
        return;
      }
    }
    next();
  } catch (error) {
    console.log("error while checking original url existance", error);
    res.status(500).send("Internal server error");
  }
};
