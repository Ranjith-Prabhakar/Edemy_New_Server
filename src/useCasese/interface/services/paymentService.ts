import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import {
  IPaymentRespose,
  TPaymentRequest,
} from "../request_And_Response/payment";

export interface IPaymentService {
  pay(
    productData: TPaymentRequest,
    role: string,
    userId: string,
    courseId: string
  ): Promise<IPaymentRespose | void>;

  striptWebHook(req: Req, next: Next): Promise<{ success: boolean } | null>;
}
