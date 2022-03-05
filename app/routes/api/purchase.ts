import express from "express";
import { purchaseHistory, purchase } from "../../controller/purchaseController";
import authenticated from "../../middlewares/authenticated";
import { purchaseValidator } from "../../validation/purchaseValidator";
const router = express.Router();

router.get("/history", purchaseHistory);
router.post("/create", authenticated, purchaseValidator, purchase);

export default router;
