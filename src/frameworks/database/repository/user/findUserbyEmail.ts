import userModel from "../../models/userModel";

export const fidUserByEmail = async (
  email: string,
  userModels: typeof userModel
) => {
  try {
    const existingUser = await userModels
      .findOne({ email })
      .select("+password");
    return existingUser;
  } catch (error) {
    throw error;
  }
};
