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
exports.updateBalance = void 0;
const AppError_1 = __importDefault(require("../../utils/Exceptions/AppError"));
const User_1 = __importDefault(require("../model/User"));
const updateBalance = (userId, amount, type) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.default.findById(userId);
    if (!user) {
        throw new AppError_1.default("User not found", 422);
    }
    let { cashBalance } = user;
    let updatedBalance = 0;
    if (type === "credit") {
        updatedBalance = cashBalance + amount;
    }
    else {
        updatedBalance = cashBalance - amount;
    }
    yield User_1.default.findByIdAndUpdate(user._id, {
        cashBalance: updatedBalance,
    });
});
exports.updateBalance = updateBalance;
