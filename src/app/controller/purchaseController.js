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
exports.purchase = exports.purchaseHistory = void 0;
const catchAsync_1 = __importDefault(require("../../utils/Exceptions/catchAsync"));
const Order_1 = __importDefault(require("../model/Order"));
const orderService_1 = require("../services/orderService");
const mongoose_1 = require("mongoose");
const purchase = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    let id = yield (0, orderService_1.createOrderTrait)(data);
    res.json({
        status: "success",
        message: "Created successfully!",
        id,
    });
}));
exports.purchase = purchase;
const purchaseHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { user, restaurant } = req.query;
    let purchaseAggregate = Order_1.default.aggregate([
        {
            $lookup: {
                from: "menus",
                localField: "menu",
                foreignField: "_id",
                as: "menu",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $lookup: {
                from: "restaurants",
                localField: "restaurant",
                foreignField: "_id",
                as: "restaurant",
            },
        },
        {
            $unwind: "$menu",
        },
        {
            $unwind: "$restaurant",
        },
        {
            $unwind: "$user",
        },
        {
            $match: Object.assign(Object.assign({}, (user && { "user._id": mongoose_1.Types.ObjectId(user.toString()) })), (restaurant && {
                restaurant: mongoose_1.Types.ObjectId(restaurant.toString()),
            })),
        },
        {
            $project: {
                user: {
                    _id: 1,
                    name: 1,
                },
                menu: {
                    dishName: 1,
                    _id: 1,
                    price: 1,
                },
                restaurant: {
                    _id: 1,
                    restaurantName: 1,
                },
                transactionAmount: 1,
                createdAt: 1,
            },
        },
    ]);
    let options = {
        limit: Number(10),
    };
    let data = yield Order_1.default.aggregatePaginate(purchaseAggregate, options);
    res.json({
        data,
    });
});
exports.purchaseHistory = purchaseHistory;
