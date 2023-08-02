export interface IUserView {
    id:number,
    userName:string,
    name:string,
    image:string,
    backgroundImage:string|null,
    description:string,
    verified:boolean,
    country:string,
    countryCode:string
}

export interface ITweetView {
    id:number,
    tweetText:string,
    medias:IMedia[],
    user:IUserView,
    reposted:ITweetView|null|undefined,
    liked:boolean,
    likesCount:number,
    retweeted:boolean,
    retweetedCount:number,
    viewsCount:number,
    createdAt:string,
    createdAtStr:string,
}

export interface IMedia {
    id:number,
    path:string
}