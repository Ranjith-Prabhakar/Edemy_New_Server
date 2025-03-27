const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "300",
  10
);
const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1200",
  10
);

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  domain?: string;
  path?: string;
  secure?: boolean;
}

const accessTokenProductionMode =
  process.env.NODE_ENV === "production" ? true : false;
const domainOption =
  process.env.NODE_ENV === "production" ? ".edemy.shop" : undefined;

// options for cookies
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000), //5 hour
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  domain: domainOption,
  path: "/",
  secure: accessTokenProductionMode,
};
export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000), // 3 days
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  domain: domainOption,
  path: "/",
  secure: accessTokenProductionMode,
};

// const accessTokenExpire = parseInt(
//   process.env.ACCESS_TOKEN_EXPIRE || "300",
//   10
// );
// const refreshTokenExpire = parseInt(
//   process.env.REFRESH_TOKEN_EXPIRE || "1200",
//   10
// );

// interface ITokenOptions {
//   expires: Date;
//   maxAge: number;
//   httpOnly: boolean;
//   sameSite: "lax" | "strict" | "none" | undefined;
//   domain?:string;
//   path?:string;
//   secure?: boolean;
// }

// const accessTokenProductionMode =
//   process.env.NODE_ENV === "production" ? true : false;

// // options for cookies
// export const accessTokenOptions: ITokenOptions = {
//   expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000), //5 hour
//   maxAge: accessTokenExpire * 60 * 60 * 1000,
//   httpOnly: true,
//   sameSite: "strict",
//   // domain: '.digi-world.online',
//   // path: '/',
//   secure: accessTokenProductionMode,
// };
// export const refreshTokenOptions: ITokenOptions = {
//   expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000), // 3 days
//   maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
//   httpOnly: true,
//   sameSite: "strict",
//   // domain: '.digi-world.online',
//   // path: '/',
//   secure: accessTokenProductionMode,
// };
