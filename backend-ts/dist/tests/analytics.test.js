"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const chai_http_1 = __importDefault(require("chai-http"));
const chai_1 = __importStar(require("chai"));
const index_1 = __importDefault(require("../index"));
chai_1.default.use(chai_http_1.default);
describe('Analytics Controller', () => {
    let shortUrlId;
    // Before running the tests, create a short URL and store its ID
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield chai_1.default
            .request(index_1.default)
            .post('/short')
            .send({
            original_url: 'https://www.example.com',
            expiration_date: '2023-12-31',
            title: 'Example Title',
            description: 'Example Description',
        });
        shortUrlId = response.body.short_url.split('/').pop();
    }));
    // Test case for getting URL analytics
    it('should get URL analytics', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield chai_1.default.request(index_1.default).get(`/analytics/${shortUrlId}`);
        (0, chai_1.expect)(response).to.have.status(200);
        (0, chai_1.expect)(response.body).to.have.property('url_details');
        (0, chai_1.expect)(response.body.url_details).to.have.property('original_url');
        (0, chai_1.expect)(response.body.url_details).to.have.property('short_id');
        (0, chai_1.expect)(response.body.url_details).to.have.property('stats');
        (0, chai_1.expect)(response.body.url_details.stats).to.have.property('total_visitors');
        (0, chai_1.expect)(response.body.url_details.stats).to.have.property('unique_visitors');
    }));
    // Test case for getting all visitors with pagination
    it('should get all visitors with pagination', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield chai_1.default.request(index_1.default).get(`/analytics/visitors/${shortUrlId}?page=1`);
        (0, chai_1.expect)(response).to.have.status(200);
        (0, chai_1.expect)(response.body).to.be.an('array');
    }));
    // After running the tests, delete the created short URL
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        yield chai_1.default.request(index_1.default).delete(`/delete/${shortUrlId}`);
    }));
});
