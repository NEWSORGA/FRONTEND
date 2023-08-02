export {};
declare global {
    interface Window {
        google: any,
        [key: string]: any
    }
}

export interface ICreateGoogleUser{
    name:string,
    email:string,
    image:string,
    country:string,
    countryCode:string,
    token:string
}
