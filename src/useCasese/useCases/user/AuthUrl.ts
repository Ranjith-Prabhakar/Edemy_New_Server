import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IAuthService } from "../../interface/services/AuthService";
import { catchError } from "../../middlewares/catchError";

export const gAuthUrl = async (authService: IAuthService, next: Next) => {
  try {
    return await authService.getAuthUrl();
  } catch (error) {
    catchError(error, next);
  }
};
