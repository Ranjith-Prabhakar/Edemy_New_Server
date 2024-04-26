import { IUser } from "../../../entities/user";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IAuthService } from "../../interface/services/AuthService";
import { ICloudSession } from "../../interface/services/cloudSession";
import { IJwt, IToken } from "../../interface/services/jwt.types";
import { catchError } from "../../middlewares/catchError";
import ErrorHandler from "../../middlewares/errorHandler";

export const gAuth = async (
  authService: IAuthService,
  userRepository: IUserRepository,
  token: IJwt,
  cloudSession: ICloudSession,
  req: Req,
  next: Next
): Promise<{ user: IUser; tokens: IToken } | void> => {
  try {
    const mailData = (await authService.getVerification(req)) as {
      name: string;
      email: string;
    };

    if (mailData.email) {
      //check whether the user already registered
      const user = await userRepository.findUserByEmail(
        mailData.email as string
      );
      if (user) {
        if (user.status === "frozen") {
          next(new ErrorHandler(400, "access has been denied by admin"));
        }
        const tokens = await token.createAccessAndRefreshToken(
          user?._id as string
        );
        await cloudSession.createUserSession(user?._id as string, user);
        return {
          user,
          tokens,
        };
      } else {
        const user = await userRepository.createUser({
          name: mailData.name as string,
          email: mailData.email,
          password: "googleAuthPassword",
        });

        const tokens = await token.createAccessAndRefreshToken(
          user?._id as string
        );
        await cloudSession.createUserSession(user?._id as string, user);
        return {
          user,
          tokens,
        };
      }
    }
  } catch (error) {
    catchError(error, next);
  }
};
