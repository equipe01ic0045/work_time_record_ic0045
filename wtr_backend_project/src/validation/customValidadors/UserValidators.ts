import { CustomValidator } from "express-validator";
import UserRepository from "../../prisma/repositories/UserRepository";
import { AuthorizationError, ConflictError, NotFoundError } from "../../types/errors";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../config";

export class UserValidator {
    private readonly userRepository: UserRepository;
    private static instance: UserValidator;

    constructor () {
        this.userRepository = new UserRepository();
    }

    public static getInstance(): UserValidator {
        if (!UserValidator.instance) {
            UserValidator.instance = new UserValidator();
        }
        return UserValidator.instance;
    }

    public isEmailAvailable: CustomValidator = async (input) => {
        const foundUser = await this.userRepository.findUserByEmail(input);
        if (foundUser) {
            throw new ConflictError("email");
        }
        return true;
    }

    public isExistingUser: CustomValidator = async (input: {userId: number}) => {
        const foundUser = await this.userRepository.findUserByUserId(input.userId);
        if (!foundUser) {
            throw new NotFoundError("user")
        }
        return true;
    }

    public isValidJwtToken: CustomValidator = async (input, { req }) => {
        const token =  req.cookies?.token;
        if (!token) {
            throw new AuthorizationError();
        }
        try {
            const decoded =  jwt.verify(token, JWT_SECRET) as  {
                userId: number
            };
            req.user = decoded;
            return true;
        } catch (error) {
            throw new AuthorizationError();
        }
         

    }
}