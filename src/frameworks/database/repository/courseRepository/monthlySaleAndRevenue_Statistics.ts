import courseModel from "../../models/courseModel";

export const monthlySaleAndRevenue_Statistics = async (): Promise<
  void | { month: string; sale: string; revenue: string }[]
> => {
  try {
    const result = await courseModel.aggregate([
      {
        $match: {
          status: "approved", // Filter for approved courses
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          sale: { $sum: "$noOfPurchase" }, // Sum of noOfPurchase for each month
          revenue: { $sum: { $multiply: ["$noOfPurchase", "$price"] } }, // Total revenue for each month
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          revenue: 1,
          sale: 1,
        },
      },
    ]);
    return result as { month: string; sale: string; revenue: string }[];
  } catch (error) {
    throw error;
  }
};
