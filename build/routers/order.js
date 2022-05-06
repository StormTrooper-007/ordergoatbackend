"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var order_1 = require("../controllers/order");
var router = express_1.default.Router();
router.post('/', order_1.createOrder);
router.get('/', order_1.getOrders);
exports.default = router;
//# sourceMappingURL=order.js.map