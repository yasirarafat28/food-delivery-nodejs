import express from "express";
import bodyParser from "body-parser";
const app = express();

import apiRoutes from "./app/routes/api";
import AppError from "./utils/Exceptions/AppError";
const { globalError } = require("./utils/Exceptions/globalError");
import mongoose from "mongoose";

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

app.use(globalError);

require("dotenv").config();

const mongo__db__url = process?.env?.MONGODB_URL ?? "";
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

export default app;
