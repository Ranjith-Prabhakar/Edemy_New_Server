"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const google_auth_library_1 = require("google-auth-library");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthService {
    redirectUrl = process.env.NODE_ENV === "production"
        ? process.env.REDIRECT_URI
        : `http://127.0.0.1:8000/api/v1/gauth`;
    oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.AUTH_CLIENT_ID, process.env.AUTH_CLIENT_SECRET, this.redirectUrl);
    async getUserData(access_token) {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
        const data = await response.json();
        return data;
    }
    // ------------------------------------------
    async getAuthUrl() {
        try {
            const authorizeUrl = this.oAuth2Client.generateAuthUrl({
                access_type: "offline",
                scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid ",
                prompt: "consent",
            });
            if (authorizeUrl)
                return authorizeUrl;
        }
        catch (error) {
            throw error;
        }
    }
    async getVerification(req) {
        try {
            const code = req.query.code;
            try {
                const res = await this.oAuth2Client.getToken(code);
                // Make sure to set the credentials on the OAuth2 client.
                await this.oAuth2Client.setCredentials(res.tokens);
                const user = await this.getUserData(this.oAuth2Client.credentials.access_token);
                return { name: user.name, email: user.email };
            }
            catch (error) {
                console.log("error in google sign in ");
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map