import { ICategory } from "../../../../entities/category";
import categoryModel from "../../models/categoryModel";

export const addCategory = async (category: string): Promise<ICategory> => {
  try {
    return await categoryModel.create({ name: category });
  } catch (error) {
    throw error;
  }
};
