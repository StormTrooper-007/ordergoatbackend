"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var order = new mongoose_1.default.Schema({
    orders: [
        {
            name: String,
            image: String,
            price: Number,
            section: String,
            quantity: Number,
            notes: String,
            table: Number,
            day: String,
            time: String,
            user: String
        },
    ],
});
exports.default = mongoose_1.default.model('Order', order);
//# sourceMappingURL=Order.js.map