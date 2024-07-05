"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const injuctions_1 = require("./injections/injuctions");
const auth_1 = require("../middlewares/auth");
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
function userRoute(router) {
    /////////
    router.post("/register", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => injuctions_1.userController.registerUser(req, res, next)));
    /////////
    router.post("/create_user", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.userController.createUser(req, res, next);
    }));
    /////////
    router.post("/login", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        // next(new Error("custome error from route"));
        // errorMiddleware(new Error("custome error from route"), req, res)
        injuctions_1.userController.login(req, res, next);
    }));
    /////////
    router.post("/logout", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.userController.logout(req, res, next);
    }));
    /////////
    router.get("/refresh", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.userController.refresh(req, res, next);
    }));
    /////////
    router.post("/be_instructor", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.userController.beInstructor(req, res, next);
    }));
    /////////
    router.post("/forgot_password_email_submission", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.userController.forgotPassword(req, res, next);
    }));
    /////////
    router.post("/forgot_password_otp_verification", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.userController.forgotPasswordOtpVerification(req, res, next);
    }));
    router.post("/reset_forgot_password", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.userController.resetForgotPassword(req, res, next);
    }));
    //////////
    router.get("/user_session", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.userController.userSession(req, res, next);
    }));
    //
    router.get("/get_notifications", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.userController.getNotifications(req, res, next);
    }));
    //
    router.post("/update_notification", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.userController.updateNotifications(req, res, next);
    }));
    //
    router.post("/resend_otp", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.userController.resendOtp(req, res, next);
    }));
    //
    router.post("/gauth_url", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.userController.gAuthUrl(req, res, next);
    }));
    router.get("/gauth", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.userController.gAuth(req, res, next);
    }));
    router.post("/setCookie", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.userController.setCookies(req, res, next);
    }));
    return router;
}
exports.userRoute = userRoute;
//# sourceMappingURL=userRoute.js.map