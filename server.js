"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const { globalError } = require("./utils/Exceptions/globalError");
require("dotenv").config();
let l = require("lodash");
const api_1 = __importDefault(require("./app/routes/api"));
const AppError_1 = __importDefault(require("./utils/Exceptions/AppError"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/api", api_1.default);
app.get("/", (req, res) => {
    res.json({
        message: "Food Delivery server is on 🔥",
    });
});
app.all("*", (req, res, next) => {
    next(new AppError_1.default(`Can't find route ${req.originalUrl} on this Node server`, 404));
});
const mongo__db__url = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.MONGODB_URL) !== null && _b !== void 0 ? _b : "";
mongoose_1.default.connect(mongo__db__url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
mongoose_1.default.connection.on("connected", function () {
    console.log("MongoDB for User/Wallet is on 🔥");
});
mongoose_1.default.connection.on("error", function (error) {
    console.error("MongoDB connection interupted!");
});
app.use(globalError);
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(`Food Delivery server is on 🔥 on port ${port}`);
});
