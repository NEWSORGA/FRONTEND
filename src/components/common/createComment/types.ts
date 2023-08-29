export interface ICommentCreate {
    commentText:string,
    tweetId: number,
    imagesIds:number[],
    commentParentId:number|null|undefined,
    postTime: Date|null|undefined,
    timeZone: string
}
