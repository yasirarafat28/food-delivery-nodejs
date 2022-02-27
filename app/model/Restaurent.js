const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const defaults = {
  type: String,
  default: null,
};
const restaurentSchema = new Schema(
  {
    name: {
      ...defaults,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

restaurentSchema.plugin(aggregatePaginate);
const Restaurent = mongoose.model("Restaurent", restaurentSchema);

module.exports = Restaurent;
