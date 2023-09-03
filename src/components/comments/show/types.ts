import { IMedia } from "../../profile/types";

// Оголошення типу Comment
export interface ICommentViewModel  {
    id: number,
    commentText: string,
    medias:IMedia[],
    user: IUserViewComment,
    thoughtId: number,
    commentParentId:number,
    createdAt: string;
    createdAtStr: string;
    children:ICommentViewModel[],
    isComment: boolean,
    isReply: boolean,
    replyToId: number|null|undefined,
    replyTo: ICommentViewModel,
    
};

// Оголошення пропсів для компонента
export interface CommentProps  {
    comment: ICommentViewModel;
};

export interface IUserViewComment {
    id:number,
    userName:string,
    name:string,
    image:string,
    backgroundImage:string|null,
    description:string,
    verified:boolean,
    country:string,
    countryCode:string,
    followers:number,
    following:number,
    likes:number,
    isFollowed:boolean
}