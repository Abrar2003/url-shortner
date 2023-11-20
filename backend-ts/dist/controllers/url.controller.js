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
exports.deleteShortUrl = exports.getShortUrlsByAppId = exports.updateURL = exports.redirectToOriginalURL = exports.shortenURL = void 0;
const validator_1 = __importDefault(require("validator"));
const url_model_1 = __importDefault(require("../models/url.model"));
const accessLog_model_1 = __importDefault(require("../models/accessLog.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createUrl_service_1 = require("../services/createUrl.service");
const DOMAIN = process.env.DOMAIN;
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : undefined;
const shortenURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(DOMAIN)
    try {
        const { original_url, expiration_date, title, description } = req.body;
        // Validate the original_url
        if (!validator_1.default.isURL(original_url)) {
            res.status(400).json({ error: 'Invalid URL format' });
            return;
        }
        const existing_url = yield (0, createUrl_service_1.findExistingURL)(original_url);
        // if (existing_url) {
        //   console.log('existing');
        //   res.json({
        //     short_url: `${DOMAIN}/${existing_url.short_id}`,
        //   });
        //   return;
        // }
        if (existing_url) {
            if (existing_url.status === 'expired') {
                // Update the status to 'active'
                existing_url.status = 'active';
                // Update the expiration_date to the next 1 year
                existing_url.expiration_date = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
                yield existing_url.save();
                res.json({
                    short_url: `${DOMAIN}/${existing_url.short_id}`,
                });
                return;
            }
            // If the URL is not expired, return the existing short URL
            res.json({
                short_url: `${DOMAIN}/${existing_url.short_id}`,
            });
            return;
        }
        // if (existing_url && existing_url.status === 'expired') {
        //   // If URL has expired, provide a message to update the expiry date
        //   res.status(400).json({ error: 'URL has expired. Please update the expiry date.' });
        //   return;
        // }
        // Generate a unique short_id
        const short_id = yield (0, createUrl_service_1.generateUniqueShortID)();
        const expirationDate = (0, createUrl_service_1.getExpirationDate)(expiration_date);
        // Create a new URL entry in the database
        const url = (0, createUrl_service_1.createNewURL)(original_url, short_id, expirationDate, title, description);
        yield url.save();
        res.json({ short_url: `${DOMAIN}/${short_id}` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.shortenURL = shortenURL;
const redirectToOriginalURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortId } = req.params;
        const ip_address = req.ip;
        const referrer = req.headers.referer || req.headers.referrer || null;
        console.log('referrer', referrer);
        // Check for Invalid shortId
        if (!validator_1.default.isAlphanumeric(shortId)) {
            res.status(400).json({ error: 'Invalid shortId format' });
            return;
        }
        // Find the URL in the database using the short_id
        const url = yield url_model_1.default.findOne({ short_id: shortId });
        if (!url) {
            res.status(404).json({ error: 'URL not found' });
            return;
        }
        // Handling Expired URLs
        if (url.expiration_date && new Date(url.expiration_date) < new Date()) {
            // Update the status to 'expired'
            url.status = 'expired';
            yield url.save();
            res.status(400).json({ error: 'URL has expired' });
            return;
        }
        const log = yield accessLog_model_1.default.create({
            url_id: url._id,
            ip_address,
            visit_time: Date.now(),
        });
        // Redirect to the original URL
        res.redirect(url.original_url);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.redirectToOriginalURL = redirectToOriginalURL;
const updateURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortId } = req.params;
        const updateFields = req.body;
        // Handling Non-Existing URLs
        const url = yield url_model_1.default.findOne({ short_id: shortId });
        if (!url) {
            res.status(404).json({ error: 'URL not found' });
            return;
        }
        // Update the fields in the database
        for (const [key, value] of Object.entries(updateFields)) {
            // Explicitly cast to any if needed
            url[key] = value;
        }
        // Save the updated URL
        yield url.save();
        // Return the updated fields in the response
        res.json(updateFields);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateURL = updateURL;
const getShortUrlsByAppId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { app_id } = req.query;
        const { page } = req.query;
        const pageSize = 10; // Adjust the page size as needed
        //   const result = await URL.getByAppId(app_id, page, pageSize);
        const result = yield url_model_1.default.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        res.send(result);
    }
    catch (error) {
        console.error('Error fetching URLs by App Id:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getShortUrlsByAppId = getShortUrlsByAppId;
// Controller to delete short URL by shortId
const deleteShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortId } = req.params;
    try {
        const deletedUrl = yield url_model_1.default.findOneAndDelete({ short_id: shortId });
        if (deletedUrl) {
            res.json({
                success: true,
                message: 'URL deleted successfully',
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'URL not found',
            });
        }
    }
    catch (error) {
        console.error('Error deleting URL by shortId:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
exports.deleteShortUrl = deleteShortUrl;
