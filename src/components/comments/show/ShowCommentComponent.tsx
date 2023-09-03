import { useEffect, useState } from 'react';

import { http } from '../../../http';
import { CommentsGetViewModel, ShowChildCommentsState } from '../component/types';

import CommentModel from '../component/CommentModel';
import React from 'react';
import { ICommentViewModel } from './types';

const ShowCommentComponent = ({ Comments, children, loadComments }: { Comments: ICommentViewModel[] | undefined, children:boolean,loadComments:any }) => {


    const [endIndex, setEndIndex] = useState(3);
    




    useEffect(() => {

    }, [])

    

    const renderComments = (comments: ICommentViewModel[], ) => {
        return (
            comments.map(p => (
                <div key={p.id} className='commentBlock child'>
                    <CommentModel comment={p} child={children} loadComments={loadComments} />                   
                </div>
            ))
        );
    };


    const plusComments = () => {
        setEndIndex(endIndex + 3);
        
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