import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthorizedRequest from "../types/interfaces/AuthorizedRequest";
import { JWT_SECRET } from "../config";

// Middleware for JWT authorization
export default function authorize(
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) {
  // Retrieve the JWT token from the 'token' cookie
  const token = req.cookies.token;

  // Check if a token is provided
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing." });
  }

  try {
    // Verify the token and decode its payload
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
    };

    req.user = decoded;

    next();
  } catch (error) {
    // Token is invalid or has expired
    return res.status(401).json({ message: "Invalid token." });
  }
}
