const Restaurent = require("../model/Restaurent");

exports.restaurentList = async (req, res) => {
  //   let data = await Restaurent.find();

  let restaurentAggregate = Restaurent.aggregate([
    {
      $match: {},
    },
    {
      $lookup: {
        from: "menus",
        localField: "_id",
        foreignField: "restaurent",
        as: "menus",
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $project: {
        _id: 0,
        restaurantName: 1,
        oepningHours: 1,
        menus: {
          dishName: 1,
          price: 1,
        },
      },
    },
  ]);

  let options = {
    limit: Number(10),
  };
  let data = await Restaurent.aggregatePaginate(restaurentAggregate, options);

  res.json({
    data,
  });
};
