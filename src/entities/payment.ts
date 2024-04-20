export interface IPayment {
  _id: string;
  userId: string;
  category:string;
  courseId: string;
  expiresAt?: Date;
  createdAt?: Date;
}
