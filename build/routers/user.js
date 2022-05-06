"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../controllers/user");
var router = express_1.default.Router();
router.get('/', user_1.getUsers);
router.get('/user', user_1.getUser);
router.get('/:userId', user_1.getSingleUserById);
router.put('/:userId', user_1.isAdministratorMiddleWare, user_1.updateUser);
router.delete('/:userId', user_1.isAdministratorMiddleWare, user_1.deleteUser);
router.post('/', user_1.createUser);
router.post('/login', user_1.loginUser);
router.post('/logout', user_1.logoutUser);
exports.default = router;
//# sourceMappingURL=user.js.map