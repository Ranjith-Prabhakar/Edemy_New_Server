import { IPaymentRespose, TPaymentRequest } from "../../useCasese/interface/request_And_Response/payment";
import { IPaymentService } from "../../useCasese/interface/services/paymentService";
import { Next, Req } from "../types/serverPackageTypes";
export declare class PaymentService implements IPaymentService {
    pay(productData: TPaymentRequest, role: string, userId: string, courseId: string): Promise<void | IPaymentRespose>;
    striptWebHook(req: Req, next: Next): Promise<{
        success: boolean;
    } | null>;
}
