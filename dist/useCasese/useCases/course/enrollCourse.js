"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollCourse = void 0;
const catchError_1 = require("../../middlewares/catchError");
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const enrollCourse = async (paymentService, paymentRepository, req, next) => {
    try {
        const stripeGateWay = await paymentService.pay(req.body, req.user?.role, req.user?._id, req.body[0].courseId);
        if (stripeGateWay) {
            const result = await paymentRepository.createCollection(req.body[0], req.user?._id);
            if (result)
                return stripeGateWay;
            return next(new errorHandler_1.default(500, "something went wrong try again"));
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.enrollCourse = enrollCourse;
//# sourceMappingURL=enrollCourse.js.map