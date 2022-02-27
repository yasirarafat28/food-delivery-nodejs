const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const body_parser = require("body-parser");
const cors = require("cors");
const useragent = require("express-useragent");

global.app = express();
const { globalError } = require("./utils/Exceptions/globalError");

app.use(useragent.express());
app.use(morgan("dev"));
app.use(cors());
app.use(body_parser.urlencoded({ extended: true, limit: "50mb" }));
app.use(body_parser.json({ extended: true, limit: "50mb" }));
require("dotenv").config();
global.l = require("lodash");

// Faker
global.faker = require("faker");
const apiRoutes = require("./app/routes/api.js");
const AppError = require("./utils/Exceptions/AppError");
app.use("/api", apiRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Originex User server is on 🔥",
  });
});

app.all("*", (req, res, next) => {
  next(
    new AppError(`Can't find route ${req.originalUrl} on this Node server`, 404)
  );
});
const mongo__db__url = process.env.MONGODB_URL;

mongoose.connect(mongo__db__url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", function () {
  console.log("MongoDB for User/Wallet is on 🔥");
});
mongoose.connection.on("error", function (error) {
  console.error("MongoDB connection interupted!");
});

app.use(globalError);

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Originex User server is on 🔥 on port ${port}`);
});
