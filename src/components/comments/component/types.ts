import { IMedia } from "../../profile/types";

// Оголошення типу Comment
export interface CommentsGetViewModel {
    id: number,
    commentText: string,
    userId: number,
    tweetId: number,
    createdAt: string,
    createdAtStr: string,
    commentParentId: number | undefined,
    commentsChild: CommentsGetViewModel[],
    images: IMedia[] | undefined,

};

export interface ShowChildCommentsState {
    [commentId: number]: boolean;
  }


export interface IUserViewComment {
    id: number,
    userName: string,
    name: string,
    image: string,
}