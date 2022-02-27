const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const defaults = {
  type: String,
  default: null,
};
const restaurentSchema = new Schema(
  {
    restaurantName: {
      ...defaults,
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

restaurentSchema.plugin(aggregatePaginate);
const Restaurent = mongoose.model("Restaurent", restaurentSchema);

module.exports = Restaurent;
