// import { IUser } from "../../../../entities/user";
// import userModel from "../../models/userModel";

// export const getUsers = async (role: string): Promise<IUser[]> => {
//   try {
//     return await userModel.find({ role: { $eq: role } });
//   } catch (error) {
//     throw error;
//   }
// };

import { IUser } from "../../../../entities/user";
import userModel from "../../models/userModel";

export const getUsers = async (
  role: string,
  pageNo: number
): Promise<{ permitedNext: number; data: IUser[] }> => {
  try {
    const start = (pageNo - 1) * 10;
    const end = start + 10;
    const [length, result] = await Promise.all([
      userModel.find({ role: { $eq: role } }).countDocuments(),
      userModel
        .find({ role: { $eq: role } })
        .skip(start)
        .limit(end),
    ]);
    return { permitedNext: Math.ceil(length / 10), data: result };
  } catch (error) {
    throw error;
  }
};
