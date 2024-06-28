"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const errorMiddleware_1 = require("../../../useCasese/middlewares/errorMiddleware");
//routes
const userRoute_1 = require("../routes/userRoute");
const adminRoutes_1 = require("../routes/adminRoutes");
const courseRoute_1 = require("../routes/courseRoute");
const chatRoute_1 = require("../routes/chatRoute");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: process.env.CLIENT,
    // origin: [ process.env.CLIENT as string , "http://localhost:5173" ],
    credentials: true,
    methods: ["GET", "PATCH", "PUT", "POST"],
    optionsSuccessStatus: 204,
}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use("/api/v1/", (0, userRoute_1.userRoute)(express_1.default.Router()));
exports.app.use("/api/v1/admin/", (0, adminRoutes_1.adminRoute)(express_1.default.Router()));
exports.app.use("/api/v1/course/", (0, courseRoute_1.courseRoute)(express_1.default.Router()));
exports.app.use("/api/v1/chat/", (0, chatRoute_1.chatRoute)(express_1.default.Router()));
//unknown url
exports.app.all("*", (req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = new Error(`route ${req.originalUrl} isn't found`);
    error.statusCode = 404;
    next(error);
});
// app.use(errorMiddleware);
exports.app.use((err, req, res, next) => {
    (0, errorMiddleware_1.errorMiddleware)(err, req, res);
});
//# sourceMappingURL=app.js.map