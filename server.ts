import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const app = express();
const { globalError } = require("./utils/Exceptions/globalError");

require("dotenv").config();
let l: Global = require("lodash");

import apiRoutes from "./app/routes/api";
import AppError from "./utils/Exceptions/AppError";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", apiRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Food Delivery server is on 🔥",
  });
});

app.all("*", (req, res, next) => {
  next(
    new AppError(`Can't find route ${req.originalUrl} on this Node server`, 404)
  );
});
const mongo__db__url: string = process?.env?.MONGODB_URL ?? "";
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
  console.log(`Food Delivery server is on 🔥 on port ${port}`);
});
