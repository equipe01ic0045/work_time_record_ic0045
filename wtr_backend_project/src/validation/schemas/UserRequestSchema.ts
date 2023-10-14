import { checkSchema } from "express-validator";
import { UserValidator } from "../customValidadors/UserValidators";



 const {
    isEmailAvailable
 } =  UserValidator.getInstance();


export const CreateUserRequestSchema = checkSchema({
    full_name: {
        isString: {
            errorMessage: "Nome completo inválido"
        },
        isLength: {
            options: { min: 1 }
        }
    },
    email: {
        isEmail: {
            errorMessage: "Email inválido",
        },
        custom: {
            options:  [isEmailAvailable] 
        }
    },
    password: {
        notEmpty: true,
    }
});

export const LoginRequestSchema = checkSchema({
    email: {
        isEmail: {
            errorMessage: "Email inválido"
        }
    },
    password: {
        isString: {
            errorMessage: "Senha inválida"
        }
    }
});