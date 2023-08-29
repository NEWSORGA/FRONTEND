import { Link } from 'react-router-dom';
import { APP_ENV } from '../../../env';
import { ITweetView } from '../../profile/types';
import './Thought.css'
import { http } from '../../../http';
import { useEffect, useRef, useState, } from 'react';
import { Modal } from 'react-bootstrap';
import { IAuthUser } from '../../../store/types';
import { useSelector } from 'react-redux';

import { CommentViewModel } from '../../comments/show/types';
import CommentModel from '../../comments/show/CommentModel';
import { maxHeight } from '@mui/system';

const Thought = ({ tweet, loadPosts, details }: { tweet: ITweetView, loadPosts: any, details: boolean }) => {
    const [liked, setLike] = useState<boolean>();
    const [likesCount, setLikesCount] = useState<number>();
    const [gridColumns, setGridColumns] = useState<string>();
    const [gridRows, setGridRows] = useState<string>();
    const container = useRef<HTMLDivElement>(null);
    const [thoughtMenu, setThoughtMenu] = useState<boolean>(false);
    const btn = useRef<HTMLButtonElement>(null);
    const { user } = useSelector((store: any) => store.auth as IAuthUser);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleClickOutside = (event: MouseEvent) => {
        console.log(btn);
        if (container.current && !container.current.contains(event.target as Node) && btn.current && !btn.current.contains(event.target as Node)) {
            setThoughtMenu(false);
        }
    }

    useEffect(() => {
        setLike(tweet.liked);
        setLikesCount(tweet.likesCount);
        setGrid();
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [tweet, btn])

    const setGrid = () => {
        switch (tweet.medias.length) {
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


    const likeTweet = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();

        if (liked == false && likesCount != undefined) {
            setLike(true);
            setLikesCount(likesCount + 1);
            console.log("like", likesCount);
        }
        else if (likesCount != undefined) {
            setLike(false);
            setLikesCount(likesCount - 1);
            console.log("unlike", likesCount);
        }

        http.post("/likeTweet/" + tweet?.id).then((res) => {
            if (res.data == "Liked" && tweet != undefined && likesCount != undefined) {

            }
            else if (res.data == "unLiked" && tweet != undefined && likesCount != undefined) {


            }


        });
    }


    const deletePost = () => {
        http.delete("/tweets/" + tweet?.id).then((res) => {
            if (res.data == "Deleted") {
                loadPosts();
            }
        });
    }

    const isSeparator = (value: string): boolean => value === '/' || value === '\\' || value === ':';

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

    const myComment: CommentViewModel = {
        CommentText: 'Крутий пост',
        UserId: 2,
        CreatedAt: "02.03.2021",
        ParentId: undefined,
        medias: [{ path: "ro53sdyu.r0t.jpg", id: 3 }, { path: "vevdo44l.mwu.png", id: 1 }, { path: "vevdo44l.mwu.png", id: 1 }, { path: "vevdo44l.mwu.png", id: 1 }],
    };

    return (

        <>
            <Link to={"/thought/"+tweet.id}>
                <div className={details ? "ThoughtWrapper detailsWrapper" : "ThoughtWrapper"}>
                    <div className='ThoughtHeader'>
                        <div className="DataUserThought">
                            <Link to={`/profile/${tweet?.user.id}`}>
                                <img src={`${APP_ENV.BASE_URL + "/images/" + tweet?.user.image}`} className="rounded-circle" />
                            </Link>

                            <div className='nickAndTime'>
                                <Link to={`/profile/${tweet?.user.id}`} className="NickThought">{tweet?.user.name}</Link>

                                <span className='time'>{tweet?.createdAtStr}</span>
                            </div>

                        </div>
                        <div className='ThoughtMenu'>
                            <button className='menuBtn' onClick={() => thoughtMenu ? setThoughtMenu(false) : setThoughtMenu(true)} ref={btn}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" version="1.1" id="Capa_1" viewBox="0 0 32.055 32.055">
                                    <g>
                                        <path fill='#3E444F' d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967   C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967   s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967   c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z" />
                                    </g>
                                </svg>
                            </button>
                            <div className='dropdownMenu' ref={container} style={{ display: thoughtMenu ? "block" : "none", opacity: thoughtMenu ? "100%" : "0%" }}>
                                <ul>
                                    {user?.id != undefined && tweet.user.id == parseInt(user?.id) ? <li onClick={handleShow}>Delete</li> : null}

                                </ul>
                            </div>
                            <Modal show={show} centered className='confirmDelete' onHide={handleClose} >
                                <Modal.Body className='confirmDeleteBody'>
                                    <div className='title'>Delete thought?</div>
                                    <div className='description'>Your post will be removed from your profile. You can't get it back</div>
                                    <div className='ModalButtons'>
                                        <button className='btnModal' onClick={deletePost}>Delete</button>
                                        <button className='btnModal' onClick={handleClose}>Cancel</button>
                                    </div>
                                </Modal.Body>
                            </Modal>

                        </div>
                    </div>


                    <div className="ThoughtText">
                        {tweet?.tweetText}
                    </div>
                    <div className={details ? "images details" : "images"} style={{ gridTemplateColumns: gridColumns, gridTemplateRows: gridRows }}>

                        {tweet.medias.map((img, i) => (
                            <div key={img.id} className="col position-relative" style={i == 0 && tweet.medias.length == 3 ? { gridRowStart: 1, gridRowEnd: 3 } : {}}>
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
                                            src={tweet.medias.length == 1 ? `${APP_ENV.BASE_URL}/images/1280_` + img.path : `${APP_ENV.BASE_URL}/images/600_` + img.path}
                                            className="img-fluid"
                                            alt="Зображення"
                                            style={{ height: '100%', width: '100%', overflow: 'hidden' }}
                                        />
                                    }

                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='actions'>
                        <div className='like actionBlock'>
                            <button className='likeBtn actionBtn' onClick={likeTweet}>

                                <svg className='action' fill="#3E444F" version="1.1" id="Capa_1" viewBox="1.8 2 21 21" >
                                    <g>
                                        <path fill={liked ? "#EB4C42" : "none"} stroke={liked ? "none" : "#3E444F"} xmlns="http://www.w3.org/2000/svg" d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" />
                                    </g>
                                </svg>



                                <span className='actionCount' style={{ color: liked ? "#EB4C42" : "#3E444F" }}>{likesCount}</span>
                            </button>
                        </div>
                        <div className='like actionBlock'>
                            <button className='likeBtn actionBtn'>
                                <svg className='action' fill="#3E444F" version="1.1" id="Capa_1" viewBox="0 0 32 32">

                                    <title>comment-1</title>
                                    <desc>Created with Sketch Beta.</desc>
                                    <defs>

                                    </defs>
                                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" >
                                        <g id="Icon-Set" transform="translate(-100.000000, -255.000000)" fill="#3E444F">
                                            <path d="M116,281 C114.832,281 113.704,280.864 112.62,280.633 L107.912,283.463 L107.975,278.824 C104.366,276.654 102,273.066 102,269 C102,262.373 108.268,257 116,257 C123.732,257 130,262.373 130,269 C130,275.628 123.732,281 116,281 L116,281 Z M116,255 C107.164,255 100,261.269 100,269 C100,273.419 102.345,277.354 106,279.919 L106,287 L113.009,282.747 C113.979,282.907 114.977,283 116,283 C124.836,283 132,276.732 132,269 C132,261.269 124.836,255 116,255 L116,255 Z" id="comment-1">

                                            </path>
                                        </g>
                                    </g>
                                </svg>
                                <span className='actionCount'>{tweet?.commentsCount}</span>
                            </button>
                        </div>
                        <div className='like actionBlock'>
                            <button className='likeBtn actionBtn'>
                                <svg className='action' fill="#3E444F" version="1.1" id="Capa_1" viewBox="0 0 1024 1024">
                                    <path xmlns="http://www.w3.org/2000/svg" fill="#3E444F" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z" />
                                </svg>
                                <span className='actionCount'>{tweet?.viewsCount}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {/* <CommentModel comment={myComment} ></CommentModel> */}
                </div>
            </Link>

        </>
    );
};
export default Thought;