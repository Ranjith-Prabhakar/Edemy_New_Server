"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidation = void 0;
const errorHandler_1 = __importDefault(require("../../useCasese/middlewares/errorHandler"));
// Mail format
const mailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
// Password complexity check
const isStrongPassword = (password) => {
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
};
const inputValidation = async (req, route, next) => {
    // Trim and validate required fields
    for (const prop in req.body) {
        // if (req.body.hasOwnProperty(prop)) { this was my code but eslint gave warning so that it is changed
        if (Object.prototype.hasOwnProperty.call(req.body, prop)) {
            //by this it will avoid the trim application on any prototype chained props
            if (typeof req.body[prop] === "string") {
                req.body[prop] = req.body[prop].trim();
                // empty space checking
                if (!req.body[prop]) {
                    return next(new errorHandler_1.default(400, "required fields are missing"));
                }
                if (prop === "email") {
                    if (!mailValidation(req.body[prop])) {
                        return next(new errorHandler_1.default(400, "Invalid email format"));
                    }
                }
                if (prop === "password") {
                    // Validate password length and complexity
                    if (req.body[prop].length < 8 || !isStrongPassword(req.body[prop])) {
                        return next(new errorHandler_1.default(400, "Password does not meet complexity requirements"));
                    }
                }
            }
        }
    }
    // Additional validations based on the route
    let name, password, confirmPassword;
    switch (route) {
        case "registerUser":
            ({ name, password, confirmPassword } = req.body);
            // Validate name length
            if (name.length < 3) {
                return next(new errorHandler_1.default(400, "give a name with valid width"));
            }
            // Confirm password matching
            if (password !== confirmPassword) {
                return next(new errorHandler_1.default(400, "Password mismatches"));
            }
            break;
        // ------------------------------------------------------------
        case "verifyUser":
            if (req.body.verificationCode.length !== 4) {
                return next(new errorHandler_1.default(400, "verification code should be four digits"));
            }
            break;
        //----------------------------------------------------------------------
        case "forgotPasswordOtpVerification":
            if (req.body.verificationCode.length !== 4) {
                return next(new errorHandler_1.default(400, "verification code should be four digits"));
            }
            break;
        default:
            return true;
    }
};
exports.inputValidation = inputValidation;
//# sourceMappingURL=inputValidation.js.map