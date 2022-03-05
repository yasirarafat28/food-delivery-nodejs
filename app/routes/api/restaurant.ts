import { restaurantList } from "../../controller/restaurantController";
import express from "express";
const router = express.Router();

router.get("/list", restaurantList);

export default router;
