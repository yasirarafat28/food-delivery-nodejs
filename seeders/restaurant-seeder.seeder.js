const { Seeder } = require("mongoose-data-seed");
const Restaurant = require("../src/app/model/Restaurant");

let fileData = require("../data/restaurant_with_menu.json");

const fs = require("fs");
const Menu = require("../src/app/model/Menu");
class RestaurantSeederSeeder extends Seeder {
  async shouldRun() {
    // return true;
    return Restaurant.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    let menus = await Promise.all(
      fileData.map(async function (iteration) {
        let { menu, openingHours } = iteration;
        let resData = {
          restaurantName: iteration.restaurantName,
          cashBalance: iteration.cashBalance,
          // openingHours: {
          //   mon: {
          //     start: 830,
          //     end: 1030,
          //   },
          // },
        };

        let restaurent = await Restaurant.create(resData);

        // menus
        let sss = menu.map(function (i2) {
          let kkk = {
            dishName: i2.dishName,
            price: i2.price,
            restaurant: restaurent._id,
          };

          return kkk;
        });
        await Menu.create(sss);

        // Open Hours

        // let days = openingHours.split("/");

        // days.map(function (i3) {
        //   let from = i3.split("-")[0];
        //   let to = i3.split("-")[1];
        //   console.log(from);
        //   return {
        //     ...i3,
        //   };
        // });

        return null;
      })
    );
    return 0;
  }
}

module.exports = RestaurantSeederSeeder;
