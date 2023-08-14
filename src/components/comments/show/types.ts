import { IMedia } from "../../profile/types";

// Оголошення типу Comment
export interface CommentViewModel  {
    CommentText: string;
    UserId: number;
    CreatedAt: string;
    ParentId: number|undefined;
    medias:IMedia[],
};

// Оголошення пропсів для компонента
export interface CommentProps  {
    comment: CommentViewModel;
};

export interface IUserViewComment {
    id: number,
    userName: string,
    name: string,
    image: string,
}