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
exports.createNewURL = exports.getExpirationDate = exports.generateUniqueShortID = exports.findExistingURL = void 0;
const url_model_1 = __importDefault(require("../models/url.model"));
const shortid_1 = __importDefault(require("shortid"));
const findExistingURL = (original_url) => __awaiter(void 0, void 0, void 0, function* () {
    return yield url_model_1.default.findOne({ original_url, status: 'active' });
});
exports.findExistingURL = findExistingURL;
const generateUniqueShortID = () => __awaiter(void 0, void 0, void 0, function* () {
    let short;
    do {
        short = shortid_1.default.generate();
    } while (yield url_model_1.default.exists({ short }));
    return short;
});
exports.generateUniqueShortID = generateUniqueShortID;
const getExpirationDate = (expiration_date) => {
    if (expiration_date) {
        // Set expiration_date to the end of the day
        const date = new Date(expiration_date);
        date.setHours(23, 59, 59, 999);
        return date;
    }
    return null;
};
exports.getExpirationDate = getExpirationDate;
// Inside createNewURL function
const createNewURL = (original_url, short_id, expirationDate, title, description) => {
    // Check if the URL has expired
    const isExpired = expirationDate && new Date(expirationDate) < new Date();
    return new url_model_1.default({
        original_url,
        short_id,
        starting_date: Date.now(),
        expiration_date: isExpired
            ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
            : expirationDate
                ? new Date(expirationDate)
                : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        title,
        description,
        status: isExpired ? 'expired' : 'active',
    });
};
exports.createNewURL = createNewURL;
