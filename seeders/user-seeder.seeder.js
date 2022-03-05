const { Seeder } = require("mongoose-data-seed");
const Restaurant = require("../src/app/model/Restaurant");

let fileData = require("../data/users_with_purchase_history.json");
const Menu = require("../src/app/model/Menu");
const User = require("../src/app/model/User");
const Order = require("../src/app/model/Order");

class UserSeederSeeder extends Seeder {
  async shouldRun() {
    return true;
    return User.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    await Promise.all(
      fileData.map(async function (useriteration) {
        let { purchaseHistory } = useriteration;
        let user = await User.create({
          name: useriteration.name,
          cashBalance: useriteration.cashBalance,
        });

        await Promise.all(
          purchaseHistory.map(async function (purchaseIteration) {
            // console.log(purchaseIteration.transactionAmount);
            let checkMenu = await Menu.findOne({
              dishName: purchaseIteration.dishName,
            });

            if (checkMenu) {
              await Order.create({
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
