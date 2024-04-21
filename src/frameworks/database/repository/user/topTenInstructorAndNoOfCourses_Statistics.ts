import userModel from "../../models/userModel";

export const topTenInstructorAndNoOfCourses_Statistics = async (): Promise<
  void | [{ name: string; numberOfCourses: string }]
> => {
  try {
    const result = await userModel.aggregate([
      {
        $match: {
          role: "instructor", // Filter for instructors
          status: "active", // Filter for active users
        },
      },
      {
        $project: {
          name: 1,
          numberOfCourses: { $size: "$courses" }, // Calculate the number of courses for each instructor
          _id: 0,
        },
      },
      {
        $sort: {
          numberOfCourses: -1, // Sort by the number of courses in descending order
        },
      },
      {
        $limit: 10, // Limit to the top ten instructors
      },
    ]);
    return result as unknown as [{ name: string; numberOfCourses: string }];
  } catch (error) {
    throw error;
  }
};
