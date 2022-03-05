import mongoose, {
  Schema,
  model,
  PaginateOptions,
  Types,
  AggregatePaginateModel,
  ObjectId,
} from "mongoose";

import aggregatePaginate from "mongoose-aggregate-paginate-v2";
const defaults = {
  type: String,
  default: null,
};

interface Order extends mongoose.Document {
  transactionAmount: number;
  user?: ObjectId;
  menu?: ObjectId;
  restaurant?: ObjectId;
}
const menuSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

menuSchema.plugin(aggregatePaginate);

const OrderModel = model<Order, AggregatePaginateModel<Order>>(
  "Order",
  menuSchema
);

export default OrderModel;
