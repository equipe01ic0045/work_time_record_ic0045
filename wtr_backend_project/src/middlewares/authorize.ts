import { Response, NextFunction } from "express";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";
import AuthorizedRequest from "../interfaces/AuthorizedRequest";

// Middleware for JWT authorization
export default function authorize(
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) {
  // Extract the JWT token from the Authorization header
  const token = req.header("Authorization");

  // Check if a token is provided
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing." });
  }

  try {
    // Verify the token and decode its payload
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET) as {
      userId: number;
    };

    req.user = decoded;

    next();
  } catch (error) {
    // Token is invalid or has expired
    return res.status(401).json({ message: "Invalid token." });
  }
}
