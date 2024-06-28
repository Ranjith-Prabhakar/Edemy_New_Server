import { IUser } from "../../../entities/user";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IAuthService } from "../../interface/services/AuthService";
import { ICloudSession } from "../../interface/services/cloudSession";
import { IJwt, IToken } from "../../interface/services/jwt.types";
export declare const gAuth: (authService: IAuthService, userRepository: IUserRepository, token: IJwt, cloudSession: ICloudSession, req: Req, next: Next) => Promise<{
    user: IUser;
    tokens: IToken;
} | void>;
