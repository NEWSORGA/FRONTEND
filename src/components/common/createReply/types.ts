export interface ICommentReplyCreate {
    commentText:string,
    tweetId: number,
    mediasIds:number[],
    replyToId:number,
    commentParentId:number,
    replyToChild:boolean
}
