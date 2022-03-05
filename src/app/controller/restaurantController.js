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
exports.restaurantList = void 0;
const Restaurant_1 = __importDefault(require("../model/Restaurant"));
const restaurantList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { search, limit, page, minPrice, maxPrice, minDish, maxDish, day, time } = req.query;
    let restaurantAggregate = Restaurant_1.default.aggregate([
        {
            $lookup: {
                from: "menus",
                localField: "_id",
                foreignField: "restaurant",
                pipeline: [
                    {
                        $match: Object.assign(Object.assign({}, (minPrice && {
                            price: { $gt: parseFloat(minPrice.toString()) },
                        })), (maxPrice && {
                            price: { $lt: parseFloat(maxPrice.toString()) },
                        })),
                    },
                ],
                as: "menus",
            },
        },
        {
            $addFields: {
                menuCount: { $size: "$menus" },
            },
        },
        {
            $match: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (minDish && { menuCount: { $gte: parseInt(minDish.toString()) } })), (maxDish && { menuCount: { $lte: parseInt(maxDish.toString()) } })), { menuCount: { $gte: 1 } }), (day &&
                time && {
                [`openingHours.${day}.start`]: { $lte: parseInt(time.toString()) },
                [`openingHours.${day}.end`]: { $gte: parseInt(time.toString()) },
            })), (search && {
                $or: [
                    {
                        "menus.dishName": {
                            $regex: search.toString(),
                            $options: "i",
                        },
                    },
                    {
                        // $text: { $search: search.toString() },
                        restaurantName: {
                            $regex: search.toString(),
                            $options: "i",
                        },
                    },
                ],
            })),
        },
        {
            $project: {
                _id: 1,
                restaurantName: 1,
                openingHours: 1,
                menus: {
                    dishName: 1,
                    price: 1,
                },
                menuCount: 1,
            },
        },
    ]);
    let options = {
        limit: Number(10),
    };
    let data = yield Restaurant_1.default.aggregatePaginate(restaurantAggregate, options);
    res.json({
        status: "success",
        message: "Fetched successfully!",
        data,
    });
});
exports.restaurantList = restaurantList;
