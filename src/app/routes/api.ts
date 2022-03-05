import express from "express";
const router = express.Router();

import restaurantRouter from "./api/restaurant";
import purchaseRouter from "./api/purchase";

router.use("/restaurant", restaurantRouter);
router.use("/purchase", purchaseRouter);

router.get("/", (req, res) => {
  res.json({
    status: "API Server is on fire",
  });
});

export default router;
