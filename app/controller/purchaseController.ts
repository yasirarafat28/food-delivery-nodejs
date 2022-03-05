import Restaurant from "../model/Restaurant";
import Menu from "../model/Menu";
import catchAsync from "../../utils/Exceptions/catchAsync";
import Order from "../model/Order";
import express from "express";
import AppError from "../../utils/Exceptions/AppError";
import { createOrderTrait } from "../services/orderService";
import {
  purchaseHistoryInterface,
  purchaseOrderRequest,
} from "../interface/order";
import { AggregatePaginateResult, ObjectId, Types } from "mongoose";

const purchase = catchAsync(
  async (req: express.Request, res: express.Response): Promise<void> => {
    let data: purchaseOrderRequest = req.body;
    let id: ObjectId = await createOrderTrait(data);
    res.json({
      status: "success",
      message: "Created successfully!",
      id,
    });
  }
);

const purchaseHistory = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  let { user, restaurant } = req.query;
  let purchaseAggregate = Order.aggregate([
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
      $match: {
        ...(user && { "user._id": Types.ObjectId(user.toString()) }),
        ...(restaurant && {
          restaurant: Types.ObjectId(restaurant.toString()),
        }),
      },
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
  let data = await Order.aggregatePaginate(purchaseAggregate, options);

  res.json({
    data,
  });
};

export { purchaseHistory, purchase };
