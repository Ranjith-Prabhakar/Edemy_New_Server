import { IAuthService } from "../../useCasese/interface/services/AuthService";
import { OAuth2Client } from "google-auth-library";
import { Req } from "../types/serverPackageTypes";
import dotenv from "dotenv";
dotenv.config();

export class AuthService implements IAuthService {
  redirectUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REDIRECT_URI
      : `http://127.0.0.1:8000/api/v1/gauth`;
  oAuth2Client = new OAuth2Client(
    process.env.AUTH_CLIENT_ID,
    process.env.AUTH_CLIENT_SECRET,
    this.redirectUrl
  );

  async getUserData(access_token: string) {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );
    const data = await response.json();
    return data;
  }
  // ------------------------------------------
  async getAuthUrl(): Promise<void | string> {
    try {
      const authorizeUrl = this.oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope:
          "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid ",
        prompt: "consent",
      });
      if (authorizeUrl) return authorizeUrl;
    } catch (error) {
      throw error;
    }
  }

  async getVerification(
    req: Req
  ): Promise<{ name: string; email: string } | void> {
    try {
      const code = req.query.code as string;
      try {
        const res = await this.oAuth2Client.getToken(code);
        // Make sure to set the credentials on the OAuth2 client.
        await this.oAuth2Client.setCredentials(
          res.tokens as Record<string, any>
        );

        const user = await this.getUserData(
          this.oAuth2Client.credentials.access_token as string
        );
        return { name: user.name, email: user.email };
      } catch (error) {
        console.log("error in google sign in ");
      }
    } catch (error) {
      throw error;
    }
  }
}
