import catchAsync from "../../utils/Exceptions/catchAsync";

import express from "express";
import { ObjectId, Types } from "mongoose";
import UserModel from "../model/User";
import AppError from "../../utils/Exceptions/AppError";
import MenuModel from "../model/Menu";

const authenticated = catchAsync(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log("default authenticated");

    next();
  }
);
export default authenticated;
