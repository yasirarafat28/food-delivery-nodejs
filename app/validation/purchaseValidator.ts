import catchAsync from "../../utils/Exceptions/catchAsync";

import express from "express";
import { ObjectId, Types } from "mongoose";
import UserModel from "../model/User";
import AppError from "../../utils/Exceptions/AppError";
import MenuModel from "../model/Menu";

const purchaseValidator = catchAsync(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(req.body);

    let { user, menu } = req.body;
    if (!user) {
      throw new AppError("user id is required", 422);
    }
    if (!menu) {
      throw new AppError("menu id is required", 422);
    }

    let userInfo = await UserModel.findById(Types.ObjectId(user)).catch(
      (error) => {
        throw new AppError("Invalid user id provided", 422);
      }
    );
    if (!userInfo) {
      throw new AppError("Invalid user id provided", 422);
    }

    let menuInfo = await MenuModel.findById(Types.ObjectId(menu)).catch(
      (error) => {
        throw new AppError("Invalid menu id provided", 422);
      }
    );
    if (!menuInfo) {
      throw new AppError("Invalid menu id provided", 422);
    }

    if (menuInfo.price > user.cashBalance) {
      throw new AppError(
        "User don't have enough balance to purchase this menu",
        422
      );
    }

    req.body.menu = menuInfo;
    req.body.user = userInfo;
    next();
  }
);

export { purchaseValidator };
