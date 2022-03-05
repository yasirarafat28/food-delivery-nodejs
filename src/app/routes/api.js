"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const restaurant_1 = __importDefault(require("./api/restaurant"));
const purchase_1 = __importDefault(require("./api/purchase"));
router.use("/restaurant", restaurant_1.default);
router.use("/purchase", purchase_1.default);
router.get("/", (req, res) => {
    res.json({
        status: "API Server is on fire",
    });
});
exports.default = router;
