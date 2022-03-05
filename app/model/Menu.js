"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Schema, model, connect, PaginateModel } from "mongoose";
const mongoose_1 = require("mongoose");
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const defaults = {
    type: String,
    default: null,
};
const menuSchema = new mongoose_1.Schema({
    restaurant: {
        type: "ObjectId",
        ref: "Menu",
        default: null,
    },
    dishName: Object.assign(Object.assign({}, defaults), { index: true }),
    price: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
menuSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
// menuSchema.index({
//   dishName: "text",
// });
const MenuModel = (0, mongoose_1.model)("Menu", menuSchema);
exports.default = MenuModel;
