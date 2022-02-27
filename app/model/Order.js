const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const defaults = {
  type: String,
  default: null,
};
const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: null,
    },
    menu: {
      type: mongoose.Schema.ObjectId,
      ref: "Menu",
      default: null,
    },
    restaurant: {
      type: mongoose.Schema.ObjectId,
      ref: "Restaurent",
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

orderSchema.plugin(aggregatePaginate);
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
