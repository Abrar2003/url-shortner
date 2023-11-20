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
const url_model_1 = __importDefault(require("../models/url.model")); // Update the path accordingly
// Middleware function to check if the URL is expired
const isExpired = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortId = req.params.shortId; // Assuming the short ID is in the request parameters
        // Find the shortened URL in the database
        const url = yield url_model_1.default.findOne({ short_id: shortId });
        // Check if the URL exists
        if (!url) {
            res.status(404).json({ error: 'URL not found' });
            return;
        }
        // Check if the URL is expired
        if (url.status === 'expired' ||
            (url.expiration_date && new Date() > new Date(url.expiration_date))) {
            url.status = 'expired';
            yield url.save();
            res.status(400).json({ error: 'URL has expired' });
            return;
        }
        // If the URL is active and not expired, continue with the next middleware or route handler
        next();
    }
    catch (error) {
        console.error('Error checking URL expiration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = isExpired;
