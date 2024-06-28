import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IAuthService } from "../../interface/services/AuthService";
export declare const gAuthUrl: (authService: IAuthService, next: Next) => Promise<string | void>;
