import React, { useEffect, useState } from 'react';
import { CommentProps, ICommentViewModel, IUserViewComment, ShowChildCommentsState } from './types';
import { http } from '../../../http';
import { APP_ENV } from '../../../env';
import { Link } from 'react-router-dom';

import './Comments.css';
import ShowCommentComponent from '../show/ShowCommentComponent';
import { Modal } from 'react-bootstrap';
import { CreateComment } from '../../common/createComment/CreateComment';
import { CreateReply } from '../../common/createReply/CreateReply';
import { ButtonProps } from '@mui/material';

const CommentModel = ({ comment, child, loadComments }: { comment: ICommentViewModel, child: boolean, loadComments:any }) => {

    const [user, setUser] = useState<IUserViewComment>();
    const [showChildComments, setShowChildComments] = useState<boolean>(false);

    useEffect(() => {

        setGrid();
    }, [])
    const [gridColumns, setGridColumns] = useState<string>();
    const [gridRows, setGridRows] = useState<string>();
    const getExtension = (path: string): string => {
        for (let i = path.length - 1; i > -1; --i) {
            const value = path[i];
            if (value === '.') {
                if (i > 1) {
                    if (isSeparator(path[i - 1])) {
                        return '';
                    }
                    return path.substring(i + 1);
                }
                return '';
            }
            if (isSeparator(value)) {
                return '';
            }
        }
        return '';
    };
    const isSeparator = (value: string): boolean => value === '/' || value === '\\' || value === ':';
    const setGrid = () => {
        switch (comment.images?.length) {
            case 1:
                setGridColumns("1fr");
                setGridRows("1fr");
                break;
            case 2:
                setGridColumns("1fr 1fr");
                setGridRows("1fr");
                break;
            case 3:
                setGridColumns("1fr 1fr");
                setGridRows("1fr");
                break;
            case 4:
                setGridColumns("1fr 1fr");
                setGridRows("1fr 1fr");
                break;
            default:
                break;
        }
    }

    const toggleShowChildComments = () => {
        setShowChildComments(prevState => (
            prevState == true ? false : true
        ));
    };
    function getShowChildCommentsState(): boolean {

        return showChildComments || false;
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

        <div className="comment" style={{ width: "100%" }}>
            <div className={child ? "CommentWrapper child" : "CommentWrapper"}>
                <div className='CommentDetails' style={{ paddingLeft: child ? "51px" : "15px" }}>
                    <div className="DataUserThought">
                        <Link to={`/profile/${comment?.user.id}`}>
                            <img src={`${APP_ENV.BASE_URL + "/images/" + comment?.user.image}`} className="rounded-circle" />
                        </Link>

                        <div className='nickAndTime'>
                            <Link to={`/profile/${comment?.user.id}`} className="NickThought"><span className='nick'>{comment?.user.name}</span> <span className='replyToName'>--- {comment?.replyTo != null ? comment?.replyTo.user.name : ""}</span> </Link>

                            <span className='time'>{comment?.createdAtStr}</span>
                        </div>

                    </div>
                    <div className="CommentText">
                        {comment?.commentText}
                    </div>
                    {comment.medias.length > 0 ?
                        <div className={"images"} style={{ gridTemplateColumns: gridColumns, gridTemplateRows: gridRows }}>

                            {comment.medias.map((img, i) => (
                                <div key={img.id} className="col position-relative" style={i == 0 && comment.medias.length == 3 ? { gridRowStart: 1, gridRowEnd: 3 } : {}}>
                                    <div className="imgUp">
                                        {getExtension(img.path) == "gif"
                                            ?
                                            <img
                                                src={`${APP_ENV.BASE_URL}/images/` + img.path}
                                                className="img-fluid"
                                                alt="Зображення"
                                                style={{ height: '100%', width: '100%', overflow: 'hidden' }}
                                            />
                                            :
                                            <img
                                                src={comment.medias.length == 1 ? `${APP_ENV.BASE_URL}/images/1280_` + img.path : `${APP_ENV.BASE_URL}/images/600_` + img.path}
                                                className="img-fluid"
                                                alt="Зображення"
                                                style={{ height: '100%', width: '100%', overflow: 'hidden' }}
                                            />
                                        }

                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <></>
                    }
                    <div className=''>
                        <button className='replyBtn' onClick={handleShow}>Reply</button>
                    </div>
                    {comment.children && comment.children.length > 0 && (
                        <div className='CommentMore left'>
                            <button className="showReply" onClick={() => toggleShowChildComments()}>{getShowChildCommentsState() ? "--- Hide replies" : "--- Show replies"}</button>
                        </div>
                    )}
                </div>

                <Modal show={show} centered className='createCommentModal modal-xl' onHide={handleClose}>
                    <Modal.Header className='createCommentHeader'>
                        Reply to {comment.user.name}
                    </Modal.Header>
                    <Modal.Body className='createCommentBody'>
                    
                        <CreateReply tweet={comment.thoughtId} replyChild={comment.isReply} replyTo={comment} loadComments={loadComments} handleClose={handleClose}></CreateReply>
                    </Modal.Body>
                </Modal>

                {showChildComments ?
                    <ShowCommentComponent Comments={comment.children} children={true} loadComments={loadComments} />
                    :
                    <></>
                }
            </div>
        </div >
    );
};

export default CommentModel;