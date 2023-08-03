import { Link } from 'react-router-dom';
import { APP_ENV } from '../../../env';
import { ITweetView } from '../../profile/types';
import './Thought.css'
import { http } from '../../../http';
import { useEffect, useState, } from 'react';

const Thought = ({ tweet }: { tweet: ITweetView }) => {
    const [liked, setLike] = useState<boolean>();
    const [likesCount, setLikesCount] = useState<number>();
    const [gridColumns, setGridColumns] = useState<string>();
    const [gridRows, setGridRows] = useState<string>();
    useEffect(() => {
        setLike(tweet.liked);
        setLikesCount(tweet.likesCount);
        setGrid();

    }, [tweet])

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


    const likeTweet = () => {
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

    return (

        <>

            <div className="ThoughtWrapper">
                <div className="DataUserThought">
                    <Link to={`/profile?id=${tweet?.user.id}`}>
                        <img src={`${APP_ENV.BASE_URL + "/images/" + tweet?.user.image}`} className="rounded-circle" />
                    </Link>

                    <div className='nickAndTime'>
                        <Link to={`/profile?id=${tweet?.user.id}`} className="NickThought">{tweet?.user.name}</Link>

                        <span className='time'>{tweet?.createdAtStr}</span>
                    </div>

                </div>

                <div className="ThoughtText">
                    {tweet?.tweetText}
                </div>
                <div className='images' style={{ gridTemplateColumns: gridColumns, gridTemplateRows: gridRows }}>

                    {tweet.medias.map((img, i) => (
                        <div key={img.id} className="col position-relative" style={i == 0 && tweet.medias.length == 3 ? { gridRowStart: 1, gridRowEnd: 3 } : {}}>
                            <div className="imgUp">
                                <img
                                    src={`${APP_ENV.BASE_URL}/images/600_` + img.path}
                                    className="img-fluid"
                                    alt="Зображення"
                                    style={{ height: '100%', width: '100%', overflow: 'hidden' }}
                                />
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
                                        <path d="M116,281 C114.832,281 113.704,280.864 112.62,280.633 L107.912,283.463 L107.975,278.824 C104.366,276.654 102,273.066 102,269 C102,262.373 108.268,257 116,257 C123.732,257 130,262.373 130,269 C130,275.628 123.732,281 116,281 L116,281 Z M116,255 C107.164,255 100,261.269 100,269 C100,273.419 102.345,277.354 106,279.919 L106,287 L113.009,282.747 C113.979,282.907 114.977,283 116,283 C124.836,283 132,276.732 132,269 C132,261.269 124.836,255 116,255 L116,255 Z" id="comment-1" sketch: type="MSShapeGroup">

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
        </>
    );
};
export default Thought;