import express from "express";
import { isExpired, check_expire } from "../middlewares/url.middleware";
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
Router.post("/short", check_expire, shortenURL);
Router.get("/:shortId", isExpired, redirectToOriginalURL);
Router.put("/update/:shortId", isExpired, updateURL);

export default Router;
