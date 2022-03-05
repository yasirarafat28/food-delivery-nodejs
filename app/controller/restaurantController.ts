import Restaurant from "../model/Restaurant";
import express from "express";
import AppError from "../../utils/Exceptions/AppError";

const restaurantList = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  let { search, limit, page, minPrice, maxPrice, minDish, maxDish, day, time } =
    req.query;
  let restaurantAggregate = Restaurant.aggregate([
    {
      $lookup: {
        from: "menus",
        localField: "_id",
        foreignField: "restaurant",
        pipeline: [
          {
            $match: {
              ...(minPrice && {
                price: { $gt: parseFloat(minPrice.toString()) },
              }),
              ...(maxPrice && {
                price: { $lt: parseFloat(maxPrice.toString()) },
              }),
            },
          },
        ],
        as: "menus",
      },
    },
    {
      $addFields: {
        menuCount: { $size: "$menus" },
      },
    },
    {
      $match: {
        ...(minDish && { menuCount: { $gte: parseInt(minDish.toString()) } }),
        ...(maxDish && { menuCount: { $lte: parseInt(maxDish.toString()) } }),
        menuCount: { $gte: 1 },
        ...(day &&
          time && {
            [`openingHours.${day}.start`]: { $lte: parseInt(time.toString()) },
            [`openingHours.${day}.end`]: { $gte: parseInt(time.toString()) },
          }),

        ...(search && {
          $or: [
            {
              "menus.dishName": {
                $regex: search.toString(),
                $options: "i",
              },
            },
            {
              // $text: { $search: search.toString() },

              restaurantName: {
                $regex: search.toString(),
                $options: "i",
              },
            },
          ],
        }),
      },
    },
    {
      $project: {
        _id: 1,
        restaurantName: 1,
        openingHours: 1,
        menus: {
          dishName: 1,
          price: 1,
        },
        menuCount: 1,
      },
    },
  ]);

  let options = {
    limit: Number(10),
  };
  let data = await Restaurant.aggregatePaginate(restaurantAggregate, options);

  res.json({
    status: "success",
    message: "Fetched successfully!",
    data,
  });
};

export { restaurantList };
