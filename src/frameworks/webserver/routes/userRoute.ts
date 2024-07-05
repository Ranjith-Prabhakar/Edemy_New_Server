import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { userController } from "./injections/injuctions";
import { isAuthenticated } from "../middlewares/auth";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { errorMiddleware } from "../../../useCasese/middlewares/errorMiddleware";

export function userRoute(router: Route) {
  /////////
  router.post(
    "/register",
    catchAsyncErrors((req: Req, res: Res, next: Next) =>
      userController.registerUser(req, res, next)
    )
  );
  /////////
  router.post(
    "/create_user",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.createUser(req, res, next);
    })
  );
  /////////
  router.post(
    "/login",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      // next(new Error("custome error from route"));
      // errorMiddleware(new Error("custome error from route"), req, res)
      userController.login(req, res, next);
    })
  );
  /////////
  router.post(
    "/logout",
    isAuthenticated,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.logout(req, res, next);
    })
  );
  /////////
  router.get(
    "/refresh",
    isAuthenticated,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.refresh(req, res, next);
    })
  );
  /////////
  router.post(
    "/be_instructor",
    isAuthenticated,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.beInstructor(req, res, next);
    })
  );
  /////////
  router.post(
    "/forgot_password_email_submission",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.forgotPassword(req, res, next);
    })
  );
  /////////

  router.post(
    "/forgot_password_otp_verification",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.forgotPasswordOtpVerification(req, res, next);
    })
  );
  router.post(
    "/reset_forgot_password",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.resetForgotPassword(req, res, next);
    })
  );
  //////////
  router.get(
    "/user_session",
    isAuthenticated,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.userSession(req, res, next);
    })
  );
  //
  router.get(
    "/get_notifications",
    isAuthenticated,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.getNotifications(req, res, next);
    })
  );
  //
  router.post(
    "/update_notification",
    isAuthenticated,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.updateNotifications(req, res, next);
    })
  );
  //

  router.post(
    "/resend_otp",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.resendOtp(req, res, next);
    })
  );
  //
  router.post(
    "/gauth_url",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.gAuthUrl(req, res, next);
    })
  );

  router.get(
    "/gauth",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.gAuth(req, res, next);
    })
  );

  router.post(
    "/setCookie",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.setCookies(req, res, next);
    })
  );

  return router;
}
