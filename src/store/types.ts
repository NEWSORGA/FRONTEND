export enum AuthUserActionType {
    LOGIN_USER = "AUTH_LOGIN_USER",
    LOGOUT_USER = "AUTH_LOGOUT_USER"
}

export interface IAuthUser {
    isAuth: boolean,
    user?: IUser
}

export interface IUser {
    id: string,
    name: string,
    image: string,
    email: string,
    bg: string
}

export interface ILoginResult {
    token: string
}

export interface ILoginGoogleUser{
    token:string,
    country:string,
    countryCode:string
}

