export interface CreateUserRequestDTO {
    fullName: string,
    password: string,
    email: string
}

export interface AuthenticateUserRequestDTO {
    email: string,
    password: string,
}