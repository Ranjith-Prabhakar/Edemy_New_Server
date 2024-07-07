"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
const paymentRepository_1 = require("../database/repository/paymentRepository");
const userRepository_1 = require("../database/repository/userRepository");
const courseRepository_1 = require("../database/repository/courseRepository");
const cloudSession_1 = require("./cloudSession");
const categoryRepository_1 = require("../database/repository/categoryRepository");
const conversation_1 = require("../database/repository/conversation");
const userModel_1 = __importDefault(require("../database/models/userModel"));
const catchError_1 = require("../../useCasese/middlewares/catchError");
const errorHandler_1 = __importDefault(require("../../useCasese/middlewares/errorHandler"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
class PaymentService {
    async pay(productData, role, userId, courseId) {
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
                metadata: {
                    userId: userId,
                    courseId: courseId,
                },
            });
            return { status: 200, message: "pay now", data: session.url };
        }
        catch (error) {
            throw error;
        }
    }
    async striptWebHook(req, next) {
        const sig = req.headers["stripe-signature"];
        if (!sig) {
            throw new Error("Missing stripe-signature header");
        }
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        }
        catch (err) {
            throw new Error(`Webhook Error: ${err.message}`);
        }
        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object;
                const metadata = session.metadata;
                if (!metadata || !metadata.userId || !metadata.courseId) {
                    throw new Error("Missing metadata in session completed event");
                }
                const { userId, courseId } = metadata;
                // additional code to manipulate db
                const paymentRepository = new paymentRepository_1.PaymentRepository();
                const userRepository = new userRepository_1.UserRepository(userModel_1.default);
                const courseRepository = new courseRepository_1.CourseRepository();
                const cloudSession = new cloudSession_1.CloudSession();
                const categoryRepository = new categoryRepository_1.CategoryRepository();
                const conversationRepository = new conversation_1.ConversationRepository();
                try {
                    const courseData = (await paymentRepository.findAndDelete(userId));
                    if (courseData) {
                        const [newUserData, isPurchaseUpdated, isCategoryUpdated] = await Promise.all([
                            userRepository.addEnrolledCourse(courseData.courseId, userId),
                            courseRepository.updatePurchas(courseData.courseId),
                            categoryRepository.updateCategoryPurchasecount(courseData.category),
                        ]);
                        if (newUserData && isPurchaseUpdated && isCategoryUpdated) {
                            await cloudSession.createUserSession(userId, newUserData);
                            await conversationRepository.addParticipants(courseData.courseId, userId);
                            return {
                                success: true,
                            };
                        }
                        else {
                            next(new errorHandler_1.default(400, "please try again,something went wrong!!!"));
                        }
                    }
                }
                catch (error) {
                    (0, catchError_1.catchError)(error, next);
                }
                // -------------------
                return {
                    success: true,
                };
            case "payment_intent.requires_action":
                // Handle other event types as needed
                return null;
            // Add other event types as needed
            default:
                console.warn(`Unhandled event type: ${event.type}`);
                return null;
        }
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=paymentService.js.map