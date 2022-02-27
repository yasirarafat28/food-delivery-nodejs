const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const defaults = {
  type: String,
  default: null,
};
const menuSchema = new Schema(
  {
    restaurent: {
      type: mongoose.Schema.ObjectId,
      ref: "Restaurent",
      default: null,
    },

    dishName: {
      ...defaults,
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
const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
