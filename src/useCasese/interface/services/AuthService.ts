import { Req } from "../../../frameworks/types/serverPackageTypes";

export interface IAuthService {
  getAuthUrl(): Promise<string | void>;
  getVerification(req: Req): Promise<{ name: string; email: string } | void>;
}
