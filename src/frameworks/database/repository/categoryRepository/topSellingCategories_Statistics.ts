import categoryModel from "../../models/categoryModel";

export const topSellingCategories_Statistics = async(): Promise<void | { name: string; noOfCourses: string; }[]>=>{
try {
  const result = await categoryModel
    .find({}, { name: 1, noOfCourses: 1, _id: 0 })
    .sort({ noOfCourses: -1 })
    .limit(10) ;
  return result as unknown as { name: string; noOfCourses: string }[]; 
} catch (error) {
  throw error 
}
}