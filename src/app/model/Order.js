"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const defaults = {
    type: String,
    default: null,
};
const menuSchema = new mongoose_1.Schema({
    user: {
        type: "ObjectId",
        ref: "User",
        default: null,
    },
    menu: {
        type: "ObjectId",
        ref: "Menu",
        default: null,
    },
    restaurant: {
        type: "ObjectId",
        ref: "Restaurant",
        default: null,
    },
    transactionAmount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
menuSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
const OrderModel = (0, mongoose_1.model)("Order", menuSchema);
exports.default = OrderModel;
