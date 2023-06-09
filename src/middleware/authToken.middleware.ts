// import { AppError } from "./../errors/AppError";
// import { Request, Response, NextFunction } from "express";
// import "dotenv/config";
// import jwt from "jsonwebtoken";

// export const verifyTokenMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   let token = req.headers.authorization;
//   if (!token) {
//     throw new AppError("Invalid token", 401);
//   }
//   token = token.split(" ")[1];
//   jwt.verify(token, process.env.SECRET_KEY, (error, decoded: any) => {
//     if (error) {
//       throw new AppError(`${error}`, 401);
//     }

//     req.user = {
//       id: decoded.sub,
//       isActive: decoded.isActive,
//       isAdm: decoded.isAdm,
//     };

//     return next();
//   });
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const authTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded: any) => {
    if (error) {
      return res.status(401).json({ message: error.message });
    }

    req.user = {
      id: decoded.sub,
      isAdm: decoded.isAdm,
      isActive: decoded.isActive,
    };

    return next();
  });
};
