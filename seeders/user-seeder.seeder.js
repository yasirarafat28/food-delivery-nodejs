const { Seeder } = require("mongoose-data-seed");
const Restaurant = require("../dist/app/model/Restaurant");

let fileData = require("../data/users_with_purchase_history.json");
const Menu = require("../dist/app/model/Menu");
const User = require("../dist/app/model/User");
const Order = require("../dist/app/model/Order");

class UserSeederSeeder extends Seeder {
  async shouldRun() {
    return true;
  }

  async run() {
    await Promise.all(
      fileData.map(async function (useriteration) {
        let { purchaseHistory } = useriteration;
        let user = await User.default.create({
          name: useriteration.name,
          cashBalance: useriteration.cashBalance,
        });

        await Promise.all(
          purchaseHistory.map(async function (purchaseIteration) {
            // console.log(purchaseIteration.transactionAmount);
            let checkMenu = await Menu.default.findOne({
              dishName: purchaseIteration.dishName,
            });

            if (checkMenu) {
              await Order.default.create({
                restaurant: checkMenu.restaurant,
                user: user._id,
                menu: checkMenu._id,
                transactionAmount: purchaseIteration.transactionAmount,
              });
            }

            return null;
          })
        );

        return null;
      })
    );
  }
}

module.exports = UserSeederSeeder;
