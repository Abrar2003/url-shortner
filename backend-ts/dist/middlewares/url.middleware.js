"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_expire = exports.isExpired = void 0;
const url_model_1 = __importDefault(require("../models/url.model")); // Update the path accordingly
const validator_1 = __importDefault(require("validator"));
const createUrl_service_1 = require("../services/createUrl.service");
// Middleware function to check if the URL is expired
const isExpired = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortId = req.params.shortId; // Assuming the short ID is in the request parameters
        // Find the shortened URL in the database
        const url = yield url_model_1.default.findOne({ short_id: shortId });
        // Check if the URL exists
        if (!url) {
            res.status(404).json({ error: "URL not found" });
            return;
        }
        // Check if the URL is expired
        if (url.status === "expired" ||
            (url.expiration_date && new Date() > new Date(url.expiration_date))) {
            url.status = "expired";
            yield url.save();
            res.status(400).json({ error: "URL has expired" });
            return;
        }
        // If the URL is active and not expired, continue with the next middleware or route handler
        next();
    }
    catch (error) {
        console.error("Error checking URL expiration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.isExpired = isExpired;
const check_expire = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const DOMAIN = process.env.DOMAIN;
    const { original_url } = req.body;
    try {
        // Validate the original_url
        if (!validator_1.default.isURL(original_url)) {
            res.status(400).json({ error: "Invalid URL format" });
            return;
        }
        const existing_url = yield (0, createUrl_service_1.findExistingURL)(original_url);
        if (existing_url) {
            if (existing_url.status === "expired" ||
                (existing_url.expiration_date &&
                    new Date() > new Date(existing_url.expiration_date))) {
                existing_url.expiration_date = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
                yield existing_url.save();
                res.json({
                    short_url: `${DOMAIN}/${existing_url.short_id}`,
                });
                return;
            }
        }
        next();
    }
    catch (error) {
        console.log("error while checking original url existance", error);
        res.status(500).send("Internal server error");
    }
});
exports.check_expire = check_expire;
