import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IOtpRepository } from "../../interface/repository/otpRepository";
import { IJwt } from "../../interface/services/jwt.types";
import { ISendMail } from "../../interface/services/sendMail";
export declare const resendOtp: (jwtToken: IJwt, otpRepository: IOtpRepository, sendMailService: ISendMail, req: Req, next: Next) => Promise<{
    success: boolean;
    message: string;
} | void>;
