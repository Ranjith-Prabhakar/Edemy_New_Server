export interface ICart {
  userId: string;
  course: [{ courseId: string; courseName: string; price: string }];
}
