import { ObjectId } from "mongoose";
import catchAsync from "../../utils/Exceptions/catchAsync";
import { purchaseOrderRequest } from "../interface/order";
import OrderModel from "../model/Order";
import { updateBalance } from "./transactionService";

const createOrderTrait = async (
  data: purchaseOrderRequest
): Promise<ObjectId> => {
  let order = await OrderModel.create({
    ...data,
    transactionAmount: data.menu.price,
    restaurant: data.menu.restaurant,
  });
  updateBalance(data.user._id, data.menu.price, "debit");
  return order._id;
};

export { createOrderTrait };
