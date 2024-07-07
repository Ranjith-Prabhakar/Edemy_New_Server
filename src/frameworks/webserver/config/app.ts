import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "../../../useCasese/middlewares/errorMiddleware";

//routes
import { userRoute } from "../routes/userRoute";
import { adminRoute } from "../routes/adminRoutes";
import { courseRoute } from "../routes/courseRoute";
import { chatRoute } from "../routes/chatRoute";
import { Next, Req, Res } from "../../types/serverPackageTypes";
import { PaymentService } from "../../services/paymentService";

export const app = express();

app.use(
  cors({
    origin: process.env.CLIENT,
    // origin: [ process.env.CLIENT as string , "http://localhost:5173" ],
    credentials: true,
    methods: ["GET", "PATCH", "PUT", "POST"],
    optionsSuccessStatus: 204,
  })
);

//webhook
//webhook has to be placed before the request object going through any parsing because stripe methods need it as raw
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res, next) => {
    console.log("inside the webhook endpoint")
    let paymentService = new PaymentService();
    const result = await paymentService.striptWebHook(req, next);
    if (result && result.success) {
      res.json({ received: true });
    } else {
      // Handle other event types or errors
      console.log("Webhook processed, but no action required");
    }
  }
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", userRoute(express.Router()));
app.use("/api/v1/admin/", adminRoute(express.Router()));
app.use("/api/v1/course/", courseRoute(express.Router()));
app.use("/api/v1/chat/", chatRoute(express.Router()));

//unknown url

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = new Error(`route ${req.originalUrl} isn't found`) as any;
  error.statusCode = 404;
  next(error);
});

// app.use(errorMiddleware);
app.use((err: Error, req: Req, res: Res, next: Next) => {
  errorMiddleware(err, req, res);
});
