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
const restaurantSchema = new mongoose_1.Schema({
    restaurantName: Object.assign(Object.assign({}, defaults), { index: true }),
    openingHours: {
        type: Object,
        default: {
            mon: {
                start: 830,
                end: 1030,
            },
            tue: {
                start: 830,
                end: 1030,
            },
            wed: {
                start: 830,
                end: 1030,
            },
            thu: {
                start: 830,
                end: 1030,
            },
            fri: {
                start: 830,
                end: 1030,
            },
            sat: {
                start: 830,
                end: 1030,
            },
            sun: {
                start: 830,
                end: 1030,
            },
        },
    },
    cashBalance: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
restaurantSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
// restaurantSchema.index({
//   restaurantName: "text",
// });
const RestaurantModel = (0, mongoose_1.model)("Restaurant", restaurantSchema);
exports.default = RestaurantModel;
