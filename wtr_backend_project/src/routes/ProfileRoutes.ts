import AuthController from "../controllers/AuthController";
import BaseRoutes from "./abstract/BaseRoutes";
import { body } from "express-validator";
import { Router } from "express";
import UserRepository from "../prisma/repositories/UserRepository";

import PrismaClientSingleton from "../prisma/client";
import {  JWT_DEFAULT_SALT_ROUNDS, JWT_SECRET } from "../config";
import AuthorizedRequest from "../types/interfaces/AuthorizedRequest";
import bcrypt from "bcryptjs";
import { user } from ".prisma/client";
import jwt from "jsonwebtoken";
import { UploadedFile } from "express-fileupload";
import {Prisma} from ".prisma/client";


const client = PrismaClientSingleton.getInstance().getClient();

export default class ProfileRoutes extends BaseRoutes {
  constructor(protected controller: AuthController = new AuthController()) {
    super(controller);
  }

  get router(): Router {
    /**
     * @swagger
     * /profiles/{user_id}:
     *   get:
     *     summary: Get a user profile
     *     tags: [Profiles]
     *     security:
     *       - CookieAuth: []
     *     parameters:
     *       - in: path
     *         name: user_id
     *         required: true
     *         description: The ID of the project.
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully logged in.
     *       '401':
     *         description: Unauthorized. Invalid credentials.
     *       '404':
     *         description: Not found. User with the specified username does not exist.
     */
    this._router.get(
      "/:user_id",
      async (req, res, next) => {
        try{
            const user_id : number = parseInt(req.params.user_id);
            const profile = await (new UserRepository().findUserByUserId(user_id));
            res.json({profile});
        }catch(e){
            next(e);
        }
      }
    );

    /**
     * @swagger
     * /profiles/edit:
     *   put:
     *     summary: Edit a user profile
     *     tags: [Profiles]
     *     security:
     *       - CookieAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               full_name:
     *                  type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *               picture_url:
     *                  type: string
     *             example:
     *                 full_name: "Pedro Chaves de Carvalho"
     *                 email: "teste@email.com"
     *                 password: "12345678"
     *                 picture_url: "https://pbs.twimg.com/media/DZotU1hW0AEDN5F.jpg:large"
     *     responses:
     *       '201':
     *         description: Successfully registered a new user.
     *       '400':
     *         description: Bad request. Invalid input data.
     *       '409':
     *         description: Conflict. User with the same email already exists.
     */
    this._router.put(
      "/edit",

      body("full_name")
        .isString()
        .withMessage("Nome completo inválido")
        .isLength({ min: 1 })
        .withMessage("Insira o nome completo"),
      body("email").isEmail().withMessage("Email inválido"),
      body("cpf")
        .isNumeric()
        .isLength({ min: 11, max: 11 })
        .withMessage("CPF deve ter exatamente 11 caracteres."),
      
      this.validate,
      async (req : AuthorizedRequest, res, next) => {
        try{
            const user_id : number = req.user?.userId!;
            let { full_name, password, email, picture_url, cpf } = req.body;
            let success = true;

            let data : Prisma.userUncheckedUpdateInput = {
              email,
              full_name,
              picture_url,
              cpf,
            };

            if(password !== undefined && password.length > 0){
                password = await bcrypt.hash(password, JWT_DEFAULT_SALT_ROUNDS);
                data['password'] = password;
            }

            let profile = await client.user.update({where:{user_id}, data});

            const token = await jwt.sign(
                { 
                    userId: profile.user_id,
                    picture_url: profile.picture_url,
                    full_name : profile.full_name,
                    email : profile.email,
                }, 
                JWT_SECRET, 
                { expiresIn: "1d"}
           );

           res.cookie("token", token, {
                httpOnly: false,
                maxAge: 3600000,
                sameSite: "strict",
            });

            res.json({profile, success});
        }catch(e){
            next(e);
        }
      }
    );


    /**
     * @swagger
     * /profiles/allByName:
     *   post:
     *     summary: Edit a user profile
     *     tags: [Profiles]
     *     security:
     *       - CookieAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               full_name:
     *                  type: string
     *             example:
     *                 full_name: "Pedro Chaves de Carvalho"
     *     responses:
     *       '201':
     *         description: Successfully registered a new user.
     *       '400':
     *         description: Bad request. Invalid input data.
     *       '409':
     *         description: Conflict. User with the same email already exists.
     */
    this._router.post(
      "/allByName",
      async (req : AuthorizedRequest, res, next) => {
        try{
            let success = true;

            let { full_name } = req.body;
            const profiles = await (new UserRepository().findUsersByName(full_name));

            res.json({profiles, success});
        }catch(e){
            next(e);
        }
      }
    );




    this._router.post(
      "/upload",
      async (req : AuthorizedRequest, res, next) => {
        try{
            const user_id : number = req.user?.userId!;
            
            let success = true;
            
            if (!req.files || Object.keys(req.files).length === 0) {
              throw new Error('No files were uploaded.');
            }

            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            let sampleFile = req.files.picture as UploadedFile;

            // Use the mv() method to place the file somewhere on your server
            let file_name = `/uploads/${user_id}_${(+new Date()).toString()}.jpg`;
            sampleFile.mv('.'+file_name, function(err) {
              if (err)
                throw err;
                file_name = 'http://localhost:5000/profiles'+file_name;
                res.json({file_name, success});
            });

            
        }catch(e){
            next(e);
        }
      }
    );
    this._router.get(
      "/uploads/:filename",
      async (req : AuthorizedRequest, res, next) => {
        try{
            const filename : string = req.params.filename;
            
            let success = true;
            res.sendFile('/uploads/'+filename, {root: '.'});

            
        }catch(e){
            next(e);
        }
      }
    );

    return this._router
  }
}
