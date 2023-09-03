import React, { useEffect, useRef, useState } from 'react';
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
import { useSelector } from 'react-redux';
import { IAuthUser } from '../../../store/types';

const CommentModel = ({ comment, child, loadComments }: { comment: ICommentViewModel, child: boolean, loadComments: any }) => {

    const [showChildComments, setShowChildComments] = useState<boolean>(false);
    const container = useRef<HTMLDivElement>(null);
    const [commentMenu, setCommentMenu] = useState<boolean>(false);
    const btn = useRef<HTMLButtonElement>(null);
    const { user } = useSelector((store: any) => store.auth as IAuthUser);

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
    const deleteComment = () => {
        http.delete("/comments/RemoveComment/" + comment.id).then((res) => {
           
                handleCloseDelete();
                loadComments();
          
        });
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

    const [showDelete, setShowDelete] = useState(false);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    return (

        <div className="comment" style={{ width: "100%" }}>
            <div className={child ? "CommentWrapper child" : "CommentWrapper"}>
                <div className='CommentDetails' style={{ paddingLeft: child ? "51px" : "15px" }}>
                    <div className='CommentHeader'>
                        <div className="DataUserThought">
                            <Link to={`/profile/${comment?.user.id}`}>
                                <img src={`${APP_ENV.BASE_URL + "/images/" + comment?.user.image}`} className="rounded-circle" />
                            </Link>

                            <div className='nickAndTime'>
                                <Link to={`/profile/${comment?.user.id}`} className="NickThought"><span className='nick'>{comment?.user.name}</span> <span className='replyToName'>--- {comment?.replyTo != null ? comment?.replyTo.user.name : ""}</span> </Link>

                                <span className='time'>{comment?.createdAtStr}</span>
                            </div>

                        </div>
                        <div className='CommentMenu'>
                            <button className='menuBtn' onClick={() => commentMenu ? setCommentMenu(false) : setCommentMenu(true)} ref={btn}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" version="1.1" id="Capa_1" viewBox="0 0 32.055 32.055">
                                    <g>
                                        <path fill='#3E444F' d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967   C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967   s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967   c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z" />
                                    </g>
                                </svg>
                            </button>
                            <div className='dropdownMenu' ref={container} style={{ display: commentMenu ? "block" : "none", opacity: commentMenu ? "100%" : "0%" }}>
                                <ul>
                                    {user?.id != undefined && comment.user.id == parseInt(user?.id) ? <li onClick={handleShowDelete}>Delete</li> : null}

                                </ul>
                            </div>
                            <Modal show={showDelete} centered className='confirmDelete' onHide={handleCloseDelete} >
                                <Modal.Body className='confirmDeleteBody'>
                                    <div className='title'>Delete comment?</div>
                                    <div className='description'>Your comment will be removed with children comments. You can't get it back</div>
                                    <div className='ModalButtons'>
                                        <button className='btnModal' onClick={deleteComment}>Delete</button>
                                        <button className='btnModal' onClick={handleCloseDelete}>Cancel</button>
                                    </div>
                                </Modal.Body>
                            </Modal>

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
                        <div className='CommentReplies'>
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