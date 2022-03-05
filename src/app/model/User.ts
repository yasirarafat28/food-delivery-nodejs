import mongoose, {
  Schema,
  model,
  PaginateOptions,
  Types,
  AggregatePaginateModel,
  ObjectId,
} from "mongoose";

import aggregatePaginate from "mongoose-aggregate-paginate-v2";
interface User extends mongoose.Document {
  name: string;
  password: string;
  cashBalance: number;
}
const menuSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

menuSchema.plugin(aggregatePaginate);

const UserModel = model<User, AggregatePaginateModel<User>>("User", menuSchema);

export default UserModel;
