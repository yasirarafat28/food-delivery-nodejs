import { ObjectId } from "mongoose";
import AppError from "../../utils/Exceptions/AppError";
import UserModel from "../model/User";

const updateBalance = async (
  userId: ObjectId,
  amount: number,
  type: string
): Promise<void> => {
  let user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError("User not found", 422);
  }
  let { cashBalance } = user;
  let updatedBalance: number = 0;
  if (type === "credit") {
    updatedBalance = cashBalance + amount;
  } else {
    updatedBalance = cashBalance - amount;
  }
  await UserModel.findByIdAndUpdate(user._id, {
    cashBalance: updatedBalance,
  });
};

export { updateBalance };
