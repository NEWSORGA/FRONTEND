export interface IUserEdit {
    name: string,
    country: string,
    countryCode: string,
    description: string|undefined|null
}

export interface IChangeImage {
    backgroundImage: File
}