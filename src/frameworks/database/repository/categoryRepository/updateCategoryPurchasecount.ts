import categoryModel from "../../models/categoryModel";

export const updateCategoryPurchasecount = async (
  id: string
): Promise<boolean | void> => {
  try {
    const result = await categoryModel.updateOne(
      { _id: id },
      { $inc: { noOfCourses: 1 } }
    );
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};
