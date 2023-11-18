"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analytics_controller_1 = require("../controllers/analytics.controller");
const Router = express_1.default.Router();
Router.get('/:short_id', analytics_controller_1.getURLAnalytics);
Router.get('/visitors/:short_id', analytics_controller_1.getAllVisitors);
exports.default = Router;
