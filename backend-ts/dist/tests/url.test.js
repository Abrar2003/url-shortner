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
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const index_1 = __importDefault(require("../index")); // Adjust the path based on your project structure
const chai_2 = require("chai");
chai_1.default.use(chai_http_1.default);
describe('URL Controller', () => {
    let shortUrlId; // Used to store the short URL ID for testing later
    // Test case for creating a new short URL
    it('should create a new short URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield chai_1.default
            .request(index_1.default)
            .post('/short')
            .send({
            original_url: 'https://www.example.com',
            expiration_date: '2023-12-31',
            title: 'Example Title',
            description: 'Example Description',
        });
        (0, chai_2.expect)(response).to.have.status(200);
        (0, chai_2.expect)(response.body).to.have.property('short_url');
        shortUrlId = response.body.short_url.split('/').pop(); // Extracting short ID from the URL
    }));
    // Test case for updating a short URL
    it('should update a short URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield chai_1.default
            .request(index_1.default)
            .put(`/update/${shortUrlId}`)
            .send({
            title: 'Updated Title',
            description: 'Updated Description',
        });
        (0, chai_2.expect)(response).to.have.status(200);
        (0, chai_2.expect)(response.body).to.have.property('title').equal('Updated Title');
        (0, chai_2.expect)(response.body).to.have.property('description').equal('Updated Description');
    }));
    // Test case for getting all short URLs by App Id
    it('should get all short URLs by App Id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield chai_1.default.request(index_1.default).get('/appid');
        (0, chai_2.expect)(response).to.have.status(200);
        (0, chai_2.expect)(response.body).to.be.an('array');
    }));
    // Test case for deleting a short URL
    it('should delete a short URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield chai_1.default.request(index_1.default).delete(`/delete/${shortUrlId}`);
        (0, chai_2.expect)(response).to.have.status(200);
        (0, chai_2.expect)(response.body).to.have.property('success').equal(true);
    }));
    // Additional test cases can be added based on your requirements
});
