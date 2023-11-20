import express from "express";
import {
  shortenURL,
  redirectToOriginalURL,
  updateURL,
  getShortUrlsByAppId,
  deleteShortUrl,
} from "../controllers/url.controller";

const Router = express.Router();

Router.get("/appid", getShortUrlsByAppId);
Router.delete("/delete/:shortId", deleteShortUrl);
Router.post("/short", shortenURL);
Router.get("/:shortId", redirectToOriginalURL);
Router.put("/update/:shortId", updateURL);

export default Router;
