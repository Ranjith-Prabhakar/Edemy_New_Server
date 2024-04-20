import categoryModel from "../../models/categoryModel";

export const updateCategoryPurchasecount = async (
  name: string
): Promise<boolean | void> => {
  try {
    console.log("name",name)
    const result = await categoryModel.updateOne(
      {name:name },
      { $inc: { noOfCourses: 1 } }
    );
    console.log("result", result);
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};
