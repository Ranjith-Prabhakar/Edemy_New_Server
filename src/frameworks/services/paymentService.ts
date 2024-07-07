import {
  IPaymentRespose,
  TPaymentRequest,
} from "../../useCasese/interface/request_And_Response/payment";
import { IPaymentService } from "../../useCasese/interface/services/paymentService";
import Stripe from "stripe";
import dotenv from "dotenv";
import { Next, Req } from "../types/serverPackageTypes";
import { PaymentRepository } from "../database/repository/paymentRepository";
import { UserRepository } from "../database/repository/userRepository";
import { CourseRepository } from "../database/repository/courseRepository";
import { CloudSession } from "./cloudSession";
import { CategoryRepository } from "../database/repository/categoryRepository";
import { ConversationRepository } from "../database/repository/conversation";
import userModel from "../database/models/userModel";
import { IPayment } from "../../entities/payment";
import { catchError } from "../../useCasese/middlewares/catchError";
import ErrorHandler from "../../useCasese/middlewares/errorHandler";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class PaymentService implements IPaymentService {
  async pay(
    productData: TPaymentRequest,
    role: string,
    userId: string,
    courseId: string
  ): Promise<void | IPaymentRespose> {
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
      return { status: 200, message: "pay now", data: session.url as string };
    } catch (error) {
      throw error;
    }
  }

  async striptWebHook(
    req: Req,
    next:Next
  ): Promise<{ success:boolean} | null> {
    console.log("inside the striptWebHook function");
    const sig = req.headers["stripe-signature"] as string | undefined;

    if (!sig) {
      throw new Error("Missing stripe-signature header");
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err: any) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata as {
          userId: string;
          courseId: string;
        };

        if (!metadata || !metadata.userId || !metadata.courseId) {
          throw new Error("Missing metadata in session completed event");
        }

        const { userId, courseId } = metadata;
      
        
        // additional code to manipulate db
        const paymentRepository = new PaymentRepository();
        const userRepository = new UserRepository(userModel);
        const courseRepository = new CourseRepository();
        const cloudSession = new CloudSession();
        const categoryRepository = new CategoryRepository();
        const conversationRepository = new ConversationRepository();
        try {
          const courseData = (await paymentRepository.findAndDelete(
            userId as string
          )) as IPayment;
          if (courseData) {
            const [newUserData, isPurchaseUpdated, isCategoryUpdated] =
              await Promise.all([
                userRepository.addEnrolledCourse(
                  courseData.courseId as string,
                  userId as string
                ),
                courseRepository.updatePurchas(courseData.courseId as string),
                categoryRepository.updateCategoryPurchasecount(
                  courseData.category
                ),
              ]);
            if (newUserData && isPurchaseUpdated && isCategoryUpdated) {

              await cloudSession.createUserSession(
                userId as string,
                newUserData
              );

            
              await conversationRepository.addParticipants(
                courseData.courseId as string,
                userId as string
              );
              return {
                success: true,
              };
            } else {
               next(
                new ErrorHandler(
                  400,
                  "please try again,something went wrong!!!"
                )
              );
            }
          }
        } catch (error) {
          catchError(error, next);
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
