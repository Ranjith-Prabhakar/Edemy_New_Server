import categoryModel from "../../models/categoryModel";

export const updateCategoryPurchasecount = async (
  name: string
): Promise<boolean | void> => {
  try {
    const result = await categoryModel.updateOne(
      {name:name },
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
