"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByAdmin = exports.updateUser = exports.deleteUser = exports.logoutUser = exports.getSingleUserById = exports.getUsers = exports.getUser = exports.loginUser = exports.createUser = exports.isAdministratorMiddleWare = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var User_1 = __importDefault(require("../models/User"));
var UserServices_1 = __importDefault(require("../services/UserServices"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/** Don't really need this middleware for now since I have implemented  authorization in the frontend **/
function isAdministratorMiddleWare(req, res, next) {
    var user = req.user;
    if (user) {
        User_1.default.findOne({ username: user.username }, function (err, doc) {
            if (err)
                throw err;
            if (doc === null || doc === void 0 ? void 0 : doc.isAdmin) {
                next();
            }
            else {
                res.send('sorry only admins can perform this');
            }
        });
    }
    res.send('sorry you are not logged in');
}
exports.isAdministratorMiddleWare = isAdministratorMiddleWare;
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, email, password;
        var _this = this;
        return __generator(this, function (_b) {
            _a = req === null || req === void 0 ? void 0 : req.body, username = _a.username, email = _a.email, password = _a.password;
            if (!username ||
                !password ||
                !email ||
                typeof username !== 'string' ||
                typeof password !== 'string' ||
                typeof email !== 'string') {
                res.send('invalid values');
                return [2 /*return*/];
            }
            User_1.default.findOne({ email: email }, function (err, doc) { return __awaiter(_this, void 0, void 0, function () {
                var hashedPassword, newUser, token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (err)
                                throw err;
                            if (doc)
                                res.send('User already exists');
                            if (!!doc) return [3 /*break*/, 4];
                            return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                        case 1:
                            hashedPassword = _a.sent();
                            newUser = new User_1.default({
                                username: username,
                                email: email,
                                password: hashedPassword,
                            });
                            return [4 /*yield*/, UserServices_1.default.generateToken(newUser)];
                        case 2:
                            token = _a.sent();
                            return [4 /*yield*/, newUser.save()];
                        case 3:
                            _a.sent();
                            res.send({ token: token, newUser: newUser });
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.createUser = createUser;
function loginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, password, user, isCorrectPassword, token, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = req.body, username = _a.username, password = _a.password;
                    return [4 /*yield*/, UserServices_1.default.findUserByUsername(username)];
                case 1:
                    user = _b.sent();
                    if (!user) return [3 /*break*/, 3];
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    isCorrectPassword = _b.sent();
                    if (!isCorrectPassword) {
                        return [2 /*return*/];
                    }
                    token = jsonwebtoken_1.default.sign({ userId: user._id, username: user.username }, "".concat(process.env.JWT_SECRET), { expiresIn: '1hr' });
                    res.json(__assign({ token: token }, user));
                    return [3 /*break*/, 4];
                case 3:
                    res.send("user email does not exist");
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    e_1 = _b.sent();
                    console.log(e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.loginUser = loginUser;
function getUser(req, res, next) {
    res.send(req.user);
    res.redirect("/");
}
exports.getUser = getUser;
function getUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = res).send;
                    return [4 /*yield*/, User_1.default.find().select('-password')];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUsers = getUsers;
function getSingleUserById(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, e_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = res).send;
                    return [4 /*yield*/, UserServices_1.default.findUserWithId(req.params.userId)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _c.sent();
                    console.log(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSingleUserById = getSingleUserById;
function logoutUser(req, res, next) {
    req.logout();
    res.send('successfully logged out');
}
exports.logoutUser = logoutUser;
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserServices_1.default.delet(req.params.userId)];
                case 1:
                    _a.sent();
                    res.send('user deleted successfully');
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteUser = deleteUser;
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var update, userId, updatedUser, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    update = req.body;
                    userId = req.params.userId;
                    return [4 /*yield*/, UserServices_1.default.updateU(userId, update)];
                case 1:
                    updatedUser = _a.sent();
                    res.send(updatedUser);
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    console.log(e_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateUser = updateUser;
function updateUserByAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, update, updatedUser, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = req.params.userId;
                    update = req.body;
                    return [4 /*yield*/, UserServices_1.default.updateU(userId, update)];
                case 1:
                    updatedUser = _a.sent();
                    res.send(updatedUser);
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    console.log(e_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateUserByAdmin = updateUserByAdmin;
//# sourceMappingURL=user.js.map