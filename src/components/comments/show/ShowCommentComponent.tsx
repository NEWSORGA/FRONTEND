import { useEffect, useState } from 'react';

import { http } from '../../../http';
import { CommentsGetViewModel, ShowChildCommentsState } from '../component/types';

import CommentModel from '../component/CommentModel';
import React from 'react';

const ShowCommentComponent = ({ id }: { id: number }) => {

    const [Comments, setComments] = useState<CommentsGetViewModel[]>([]);
    const [endIndex, setEndIndex] = useState(1);
    const [showChildComments, setShowChildComments] = useState<ShowChildCommentsState>({});




    useEffect(() => {
        loadComments();
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

    const renderComments = (comments: CommentsGetViewModel[]) => {
        return (
            <>
                {comments.map(p => (
                    <React.Fragment key={p.id}>
                        <CommentModel comment={p} />
                        {p.commentsChild && p.commentsChild.length > 0 && (
                            <div className='CommentMore'>
                                <button className="btn btn-primary" onClick={() => toggleShowChildComments(p.id)}>{getShowChildCommentsState(p.id) ? "Сховати відповіді" : "Показати відповіді"}</button>
                            </div>
                        )}
                        {showChildComments[p.id] && p.commentsChild && p.commentsChild.length > 0 && (
                            renderComments(p.commentsChild)
                        )}
                    </React.Fragment>
                ))}
            </>
        );
    };

    const loadComments = () => {
        let url = "Comments?thoughtId=" + id;
        http.get(url).then(async (res) => {
           
            const fetchedComments = res.data;
            setComments(fetchedComments);

            //console.log('fetchedComments:', JSON.stringify(Comments, null, 2));
        });
    }
    const plusComments = () => {
        setEndIndex(endIndex + 2);
        if (endIndex >= 5)
            setEndIndex(Comments.length);
    }

   
    return (
        <>
            {renderComments(Comments.slice(0, endIndex))}
            {Comments.length > endIndex &&
                (<>
                    <div className='CommentMore'>
                        <button className="btn btn-primary" onClick={() => plusComments()}>Показати ще</button>
                    </div>
                </>)}

        </>
    );
};

export default ShowCommentComponent;