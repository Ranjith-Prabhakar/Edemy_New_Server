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
  return router;
}
