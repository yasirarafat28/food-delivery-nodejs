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
    password: {
        type: String,
        default: null,
    },
    name: {
        type: String,
        default: null,
    },
    cashBalance: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
menuSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
const UserModel = (0, mongoose_1.model)("User", menuSchema);
exports.default = UserModel;
