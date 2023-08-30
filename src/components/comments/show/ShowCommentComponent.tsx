import { useEffect, useState } from 'react';

import { http } from '../../../http';
import { CommentsGetViewModel, ShowChildCommentsState } from '../component/types';

import CommentModel from '../component/CommentModel';
import React from 'react';
import { ICommentViewModel } from './types';

const ShowCommentComponent = ({ Comments }: { Comments: ICommentViewModel[] | undefined }) => {


    const [endIndex, setEndIndex] = useState(1);
    const [showChildComments, setShowChildComments] = useState<ShowChildCommentsState>({});




    useEffect(() => {

    }, [])

    const toggleShowChildComments = (commentId: any) => {
        setShowChildComments(prevState => ({
            ...prevState,
            [commentId]: !prevState[commentId]
        }));
    };
    function getShowChildCommentsState(commentId: number): boolean {

        return showChildComments[commentId] || false;
    }

    const renderComments = (comments: ICommentViewModel[]) => {
        return (
            comments.map(p => (
                <div key={p.id}>
                    <CommentModel comment={p} />
                    {p.children && p.children.length > 0 && (
                        <div className='CommentMore'>
                            <button className="btn btn-primary" onClick={() => toggleShowChildComments(p.id)}>{getShowChildCommentsState(p.id) ? "Hide replies" : "Show replies"}</button>
                        </div>
                    )}
                    {showChildComments[p.id] && p.children && p.children.length > 0 && (
                        renderComments(p.children)
                    )}
                </div>
            ))
        );
    };


    const plusComments = () => {
        setEndIndex(endIndex + 2);
        if (endIndex >= 5)
            setEndIndex(Comments.length);
    }


    return (
        Comments != undefined ?

            <div className='comments'>
                {renderComments(Comments.slice(0, endIndex))}
                {Comments.length > endIndex &&
                    (<>
                        <div className='CommentMore'>
                            <button className="btn btn-primary" onClick={() => plusComments()}>Show more</button>
                        </div>
                    </>)}

            </div>
            :
            <></>
    );
};

export default ShowCommentComponent;