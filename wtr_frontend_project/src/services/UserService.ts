import axios from "./axios";

export interface loginData {
  email: string;
  password: string;
}

export interface registerUser {
  fullName: String,
  cpf: String
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

export default class UserService {

  public registerUser(registerUser: registerUser) {

    const newUser = {
      full_name: registerUser.fullName,
      cpf: registerUser.cpf,
      password: registerUser.password,
      email: registerUser.email
    } 

    console.log(newUser)

    return axios.post("auth/register", newUser);
  }

  public loginUser(data: loginData) {
    return axios.post("auth/login", data);
  }

  public  passwordRecoveryUser(cpf: number){

  }
}
