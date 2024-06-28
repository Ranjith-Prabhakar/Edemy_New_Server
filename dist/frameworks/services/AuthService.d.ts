import { IAuthService } from "../../useCasese/interface/services/AuthService";
import { OAuth2Client } from "google-auth-library";
import { Req } from "../types/serverPackageTypes";
export declare class AuthService implements IAuthService {
    redirectUrl: string | undefined;
    oAuth2Client: OAuth2Client;
    getUserData(access_token: string): Promise<any>;
    getAuthUrl(): Promise<void | string>;
    getVerification(req: Req): Promise<{
        name: string;
        email: string;
    } | void>;
}
