const restaurentRouter = require("./api/restaurent");

const router = require("express").Router();

router.get("/", async (req, res) => {
  res.json({
    status: "API Server is on fire",
  });
});

router.use("/restaurent", restaurentRouter);

module.exports = router;
