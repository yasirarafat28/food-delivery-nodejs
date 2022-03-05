"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchaseController_1 = require("../../controller/purchaseController");
const authenticated_1 = __importDefault(require("../../middlewares/authenticated"));
const purchaseValidator_1 = require("../../validation/purchaseValidator");
const router = express_1.default.Router();
router.get("/history", purchaseController_1.purchaseHistory);
router.post("/create", authenticated_1.default, purchaseValidator_1.purchaseValidator, purchaseController_1.purchase);
exports.default = router;
