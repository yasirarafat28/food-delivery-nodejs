const { restaurentList } = require("../../controller/restaurentController");

const restaurentRouter = require("express").Router();

restaurentRouter.get("/list", restaurentList);

module.exports = restaurentRouter;
