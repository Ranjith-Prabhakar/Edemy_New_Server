import { chatController } from "./injections/injuctions";
import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { isAuthenticated, autheriseRoles } from "../middlewares/auth";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

export function chatRoute(router: Route) {
  router.post(
    "/add_message",
    isAuthenticated,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      chatController.addChat(req, res, next);
    })
  );
  router.post(
    "/get_message",
    isAuthenticated,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      chatController.getChat(req, res, next);
    })
  );
  router.post(
    "/get_online_users",
    isAuthenticated,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      chatController.getOnlineUsers(req, res, next);
    })
  );

  return router;
}
