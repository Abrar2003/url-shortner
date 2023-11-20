"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const url_controller_1 = require("../controllers/url.controller");
const Router = express_1.default.Router();
Router.get("/appid", url_controller_1.getShortUrlsByAppId);
Router.delete("/delete/:shortId", url_controller_1.deleteShortUrl);
Router.post("/short", url_controller_1.shortenURL);
Router.get("/:shortId", url_controller_1.redirectToOriginalURL);
Router.put("/update/:shortId", url_controller_1.updateURL);
exports.default = Router;
