import { IOtp } from "../../../../entities/otp"
import { IOtpRepository } from "../../../interface/repository/otpRepository"

export const createOtpUserCollection = async(otpRepository:IOtpRepository,iOtpUser:IOtp)=>{

  await otpRepository.createOtpUserCollection(iOtpUser)
}