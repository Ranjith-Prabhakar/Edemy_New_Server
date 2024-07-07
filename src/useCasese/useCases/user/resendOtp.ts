import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IOtpRepository } from "../../interface/repository/otpRepository";
import { IJwt } from "../../interface/services/jwt.types";
import { ISendMail } from "../../interface/services/sendMail";
import { catchError } from "../../middlewares/catchError";

export const resendOtp = async (
  jwtToken: IJwt,
  otpRepository: IOtpRepository,
  sendMailService: ISendMail,
  req: Req,
  next: Next
): Promise<{ success: boolean; message: string } | void> => {
  try {
    const decode = await jwtToken.verifyJwt(
      req.cookies.verificationToken as string
    );
    const otp = await otpRepository.findUser(decode.email);
    const name = decode as unknown as {
      name: string;
    };
    const sendMail = await sendMailService.sendEmailVerification(
      name?.name,
      otp?.email as string,
      otp?.otp as string
    );
   
    return {
      success: sendMail.success,
      message: sendMail.success
        ? "otp has been resend"
        : "faild to resend the otp",
    };
  } catch (error) {
    catchError(error, next);
  }
};
