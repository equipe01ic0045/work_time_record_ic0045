import { Request, Response } from "express";
import { user } from "@prisma/client";
import { authService } from "../prisma/services";
import { JWT_SECRET, DEFAULT_SALT_ROUNDS } from "../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class AuthController {
  async registerUser(req: Request, res: Response) {
    const { full_name, password, email } = req.body;

    // if email is available
    if (!(await authService.getUserByEmail(email))) {
      const passwordHash = await bcrypt.hash(password, DEFAULT_SALT_ROUNDS);

      await authService.createUser(full_name, passwordHash, email);
      res.status(201).json({ message: "Usuário criado com sucesso." });
    } else {
      res
        .status(409)
        .json({ message: "Este email já está associado a outra conta." });
    }
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const user: user | null = await authService.getUserByEmail(email);

    if (!!user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie('token', token, {
        httpOnly: false,
        // httpOnly: true,
        maxAge: 3600000, // 1 hour in milliseconds
        sameSite: 'strict',
      });

      res.status(200).json({ message: "Autenticação bem sucedida." });
    } else {
      res.status(401).json({ message: "Email ou senha inválidos." });
    }
  }
}
