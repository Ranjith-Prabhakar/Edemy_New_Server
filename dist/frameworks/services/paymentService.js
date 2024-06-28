"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
class PaymentService {
    async pay(productData, role) {
        try {
            const lineItems = productData.map((product) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.courseName,
                    },
                    unit_amount: Math.round(+product.price * 100),
                },
                quantity: 1,
            }));
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: lineItems,
                success_url: `${process.env.CLIENT}/${role}/payment_success`,
                cancel_url: `${process.env.CLIENT}/cancel`,
            });
            return { status: 200, message: "pay now", data: session.url };
        }
        catch (error) {
            throw error;
        }
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=paymentService.js.map