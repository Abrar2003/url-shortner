"use strict";
// import AccessLog from "../models/accessLog.model";
// import URL from "../models/url.model";
// import { Request, Response } from "express";
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
exports.getAllVisitors = exports.getURLAnalytics = void 0;
const accessLog_model_1 = __importDefault(require("../models/accessLog.model"));
const url_model_1 = __importDefault(require("../models/url.model"));
// Analytics Endpoint
const getURLAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { short_id } = req.params;
        const urlDetails = yield url_model_1.default.findOne({ short_id });
        if (!urlDetails) {
            res.status(404).json({ error: 'URL not found' });
            return;
        }
        // Fetch access logs for this URL
        const accessLogs = yield accessLog_model_1.default.find({ url_id: urlDetails._id });
        // Assuming you have a function to calculate unique visitors
        const uniqueVisitors = calculateUniqueVisitors(accessLogs);
        const analyticsData = {
            original_url: urlDetails.original_url,
            short_id: urlDetails.short_id,
            expiration_date: urlDetails.expiration_date,
            starting_date: urlDetails.starting_date,
            title: urlDetails.title,
            description: urlDetails.description,
            status: urlDetails.status,
            stats: {
                total_visitors: accessLogs.length,
                unique_visitors: uniqueVisitors,
            },
        };
        res.json({
            url_details: analyticsData,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getURLAnalytics = getURLAnalytics;
// Calculating unique visitors
function calculateUniqueVisitors(accessLogs) {
    const uniqueIPs = new Set();
    accessLogs.forEach((log) => {
        uniqueIPs.add(log.ip_address);
    });
    return uniqueIPs.size;
}
// Get All Visitors Endpoint
const getAllVisitors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { short_id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = 6; // Number of visitors per page
        const urlDetails = yield url_model_1.default.findOne({ short_id });
        if (!urlDetails) {
            res.status(404).json({ error: 'URL not found' });
            return;
        }
        const skip = (page - 1) * limit;
        const accessLogs = yield accessLog_model_1.default.find({ url_id: urlDetails._id })
            .skip(skip)
            .limit(limit);
        res.json(accessLogs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllVisitors = getAllVisitors;
