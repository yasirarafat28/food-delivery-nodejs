const mongoose = require("mongoose");

require("dotenv").config();
const mongoURL = process.env.MONGODB_URL;

const restaurentSeeder = require("./seeders/restaurent-seeder.seeder");
const UserSeederSeede = require("./seeders/user-seeder.seeder");

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
exports.seedersList = {
  restaurentSeeder,
  UserSeederSeede,
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
exports.connect = async () => {
  await mongoose.connect(mongoURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
exports.dropdb = async () => mongoose.connection.db.dropDatabase();
