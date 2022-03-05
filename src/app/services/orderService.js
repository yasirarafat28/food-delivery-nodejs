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
exports.createOrderTrait = void 0;
const Order_1 = __importDefault(require("../model/Order"));
const transactionService_1 = require("./transactionService");
const createOrderTrait = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let order = yield Order_1.default.create(Object.assign(Object.assign({}, data), { transactionAmount: data.menu.price, restaurant: data.menu.restaurant }));
    (0, transactionService_1.updateBalance)(data.user._id, data.menu.price, "debit");
    return order._id;
});
exports.createOrderTrait = createOrderTrait;
