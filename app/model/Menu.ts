// import { Schema, model, connect, PaginateModel } from "mongoose";
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

interface Menu extends mongoose.Document {
  dishName: string;
  price: number;
  restaurant?: ObjectId;
}
const menuSchema = new Schema(
  {
    restaurant: {
      type: "ObjectId",
      ref: "Menu",
      default: null,
    },
    dishName: {
      ...defaults,
      index: true,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

menuSchema.plugin(aggregatePaginate);

// menuSchema.index({
//   dishName: "text",
// });

const MenuModel = model<Menu, AggregatePaginateModel<Menu>>("Menu", menuSchema);

export default MenuModel;
