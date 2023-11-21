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
const express_1 = __importDefault(require("express"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
const cors_1 = __importDefault(require("cors"));
const dotenv = require("dotenv");
const url_route_1 = __importDefault(require("./routes/url.route"));
const analytics_route_1 = __importDefault(require("./routes/analytics.route"));
dotenv.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "8000", 10);
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/", url_route_1.default);
app.use("/analytics", analytics_route_1.default);
app.get("/", (req, res) => {
    const ip = req.ip || "unknown";
    res.send({ message: `Hello, ${ip}` });
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connectDB_1.default)();
    console.log(`Server started on port ${PORT}`);
}));
