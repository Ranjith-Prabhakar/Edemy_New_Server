import { Req, Res } from "../../frameworks/types/serverPackageTypes";
import ErrorResponse from "./errorHandler";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorMiddleware = (err: any, req: Req, res: Res) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";
  console.log("inside error middleware #############", err.message, err.status);
  console.log("req.path", req.path);
  console.error(err);

  //wrong mongoDb id
  if (err.name === "castError") {
    const message = `Resource not found, invalid:${err.path}`;
    err = new ErrorResponse(400, message);
  }
  //duplicate key error =>for authentication
  if (err.name === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorResponse(400, message);
  }
  //wrong jwt error
  if (err.name === "jsonWebTokenError") {
    const message = `json web token is invalid,try again`;
    err = new ErrorResponse(400, message);
  }
  //token expired error
  if (err.name === "TokenExpiredError") {
    const message = `json web token has expired`;
    err = new ErrorResponse(400, message);
  }

  //for every page load in the front end these api are called irrespective of whether user logged in or not . if he isn't logged in
  // the tokens are to be empty if throw the erro with 400 status code then it will show in the browser console
  if (
    req.path === "/api/v1/refresh" ||
    req.path === "/api/v1/get_notifications" ||
    req.path === "/api/v1/user_session"
  ) {
    err = new ErrorResponse(200, err.message);
  }
  res.status(err.statusCode).json({
    status: err.statusCode,
    success: false,
    message: err.message,
  });
};
