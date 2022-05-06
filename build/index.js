"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var user_1 = __importDefault(require("./routers/user"));
var order_1 = __importDefault(require("./routers/order"));
//const LocalStrategy = passportLocal.Strategy
dotenv_1.default.config();
// Mongoose
mongoose_1.default.connect("".concat(process.env.URI), function (err) {
    if (err)
        throw err;
    console.log('connected to mongodb');
});
//Middlewares
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
// app.use(
//   session({
//     secret: `${process.env.SECRET}`,
//     resave: true,
//     saveUninitialized: true,
//   })
// )
app.use(express_1.default.json({ strict: false }));
app.use(express_1.default.urlencoded());
//app.use(cookieParser())
//app.use(passport.initialize())
//app.use(passport.session())
//Passport
// passport.use(
//   new LocalStrategy((username, password, done) => {
//     User.findOne({ username: username }, (err: Error, user: any) => {
//       if (err) throw err
//       if (!user) return done(null, false)
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (err) throw err
//         if (result === true) {
//           return done(null, user)
//         } else {
//           return done(null, false)
//         }
//       })
//     })
//   })
// )
// passport.serializeUser((user: any, cb) => {
//   cb(null, user._id)
// })
// passport.deserializeUser((id: string, cb) => {
//   User.findOne({ _id: id }, (err: Error, user: any) => {
//     const userInformation = {
//       username: user.username,
//       isAdmin: user.isAdmin,
//     }
//     return cb(err, userInformation)
//   })
// })
//Routes
app.use('/api/v1/users', user_1.default);
app.use('/api/v1/orders', order_1.default);
var port = "".concat(process.env.PORT) || 3004;
app.listen(port, function () {
    console.log("app is runing on port ".concat(port));
});
//# sourceMappingURL=index.js.map