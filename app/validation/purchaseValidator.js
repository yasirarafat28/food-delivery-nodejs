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
exports.purchaseValidator = void 0;
const catchAsync_1 = __importDefault(require("../../utils/Exceptions/catchAsync"));
const mongoose_1 = require("mongoose");
const User_1 = __importDefault(require("../model/User"));
const AppError_1 = __importDefault(require("../../utils/Exceptions/AppError"));
const Menu_1 = __importDefault(require("../model/Menu"));
const purchaseValidator = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let { user, menu } = req.body;
    if (!user) {
        throw new AppError_1.default("user id is required", 422);
    }
    if (!menu) {
        throw new AppError_1.default("menu id is required", 422);
    }
    let userInfo = yield User_1.default.findById(mongoose_1.Types.ObjectId(user)).catch((error) => {
        throw new AppError_1.default("Invalid user id provided", 422);
    });
    if (!userInfo) {
        throw new AppError_1.default("Invalid user id provided", 422);
    }
    let menuInfo = yield Menu_1.default.findById(mongoose_1.Types.ObjectId(menu)).catch((error) => {
        throw new AppError_1.default("Invalid menu id provided", 422);
    });
    if (!menuInfo) {
        throw new AppError_1.default("Invalid menu id provided", 422);
    }
    if (menuInfo.price > user.cashBalance) {
        throw new AppError_1.default("User don't have enough balance to purchase this menu", 422);
    }
    req.body.menu = menuInfo;
    req.body.user = userInfo;
    next();
}));
exports.purchaseValidator = purchaseValidator;
