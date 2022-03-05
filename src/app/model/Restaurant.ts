// import { Schema, model, connect, PaginateModel } from "mongoose";
import mongoose, {
  Schema,
  model,
  PaginateOptions,
  Types,
  AggregatePaginateModel,
} from "mongoose";

import aggregatePaginate from "mongoose-aggregate-paginate-v2";
interface Restaurant extends mongoose.Document {
  restaurantName: string;
  cashBalance: number;
  openingHours?: object;
}
const restaurantSchema = new Schema(
  {
    restaurantName: {
      type: String,
      default: null,
      index: true,
    },
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
  },
  {
    timestamps: true,
  }
);

restaurantSchema.plugin(aggregatePaginate);

// restaurantSchema.index({
//   restaurantName: "text",
// });

const RestaurantModel = model<Restaurant, AggregatePaginateModel<Restaurant>>(
  "Restaurant",
  restaurantSchema
);

export default RestaurantModel;
