import { user } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ConflictError from "../types/errors/ConflictError";
import ValidationError from "../types/errors/ValidationError";
import NotFoundError from "../types/errors/NotFoundError";
import { JWT_SECRET, JWT_DEFAULT_SALT_ROUNDS } from "../config";
import UserRepository from "../prisma/repositories/UserRepository";

export default class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  private async validateLogin(hashedPassword: string, foundUser?: user) {
    return foundUser && bcrypt.compare(hashedPassword, foundUser.password);
  }

  async createUser(
    fullName: string,
    email: string,
    password: string,
    cpf: string
  ): Promise<user> {
    const emailUser = await this.userRepository.findUserByEmail(email);
    if (emailUser) {
      throw new ConflictError("email");
    }

    const cpfUser = await this.userRepository.findUserByCPF(cpf);
    if (cpfUser) {
      throw new ConflictError("cpf");
    }

    const hashedPassword = await bcrypt.hash(password, JWT_DEFAULT_SALT_ROUNDS);
    return this.userRepository.createUser(fullName, email, hashedPassword, cpf);
  }

  async authenticateUser(email: string, password: string): Promise<string> {
    const foundUser: user | null = await this.userRepository.findUserByEmail(
      email
    );

    if (foundUser) {
      const isValidLogin = await this.validateLogin(password, foundUser);
      if (!isValidLogin) {
        throw new ValidationError(
          "email and password do not match any existing account."
        );
      }
      return this._signJWT(foundUser);
    } else {
      throw new NotFoundError("user");
    }
  }

  _signJWT(foundUser: Omit<user, "password">): string {
    return jwt.sign(
      {
        userId: foundUser.user_id,
        full_name: foundUser.full_name,
        email: foundUser.email,
        cpf: foundUser.cpf
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
  }

  async loggedUser(token: string) {
    const user = jwt.verify(token, JWT_SECRET) as {
      userId: number;
    };
    if (!user) {
      throw new NotFoundError("user");
    }
    const foundUser = await this.userRepository.findUserByUserId(user.userId);
    if (!foundUser) {
      throw new NotFoundError("user");
    }

    return foundUser;
  }

  async getUserList(): Promise<Array<Omit<user, "password">>> {
    const userList = await this.userRepository.findManyUsers()
    if (!userList) {
      throw new NotFoundError("user")
    }

    return userList
  }

  async getUser(userId: number): Promise<Omit<user, "password">> {
    const foundUser = await this.userRepository.findUserByUserId(userId);
    if (!foundUser) {
      throw new NotFoundError("user");
    }

    return foundUser;
  }

  async getUserByEmail(userEmail: string): Promise<Omit<user, "password">> {
    const foundUser = await this.userRepository.findUserByEmail(userEmail);
    if (!foundUser) {
      throw new NotFoundError("user");
    }

    return foundUser;
  }

  async getUsersByName(full_name?: string): Promise<Omit<user, "password">[]> {
    const foundUsers = await this.userRepository.findUsersByName(full_name);
    if (!foundUsers) {
      throw new NotFoundError("user");
    }

    return foundUsers;
  }

  // User might want to just change name or just e-mail without changing password, so password should be optional.
  // All other fields are not optional because they will be sent with the fetch request, even if they're unchanged.
  // That's not true for the password because it is stored as a hash on the db, so the front-end can't send the previous password to the function
  async updateUser(
    userId: number,
    fullName: string,
    email: string,
    cpf: string,
    password?: string,
  ) {
    const foundUser = await this.userRepository.findUserByUserId(userId);
    if (!foundUser) {
      throw new NotFoundError("user");
    }
    if (password !== undefined)
      password = await bcrypt.hash(password, JWT_DEFAULT_SALT_ROUNDS);

    const updatedUser = await this.userRepository.updateUser(userId, fullName, email, cpf, password);

    return await this._signJWT(updatedUser);
  }
}
