import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/userRepository";
import { catchError } from "../../middlewares/catchError";

export const getUsers = async (
  userRepository: IUserRepository,
  req: Req,
  next: Next
) => {
  try {
    return await userRepository.getUsers("user", parseInt(req.body.pageNo));
  } catch (error) {
    catchError(error, next);
  }
};
