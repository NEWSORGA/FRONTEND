import React, { useEffect, useState } from 'react';
import { CommentProps, IUserViewComment } from './types';
import { http } from '../../../http';
import { APP_ENV } from '../../../env';
import { Link } from 'react-router-dom';

import './Comments.css';

const CommentModel: React.FC<CommentProps> = ({ comment }) => {

    const [user, setUser] = useState<IUserViewComment>();

    useEffect(() => {
        loadProfile();
        setGrid();
    }, [])
    const [gridColumns, setGridColumns] = useState<string>();
    const [gridRows, setGridRows] = useState<string>();
    const loadProfile = () => {
        let url = "auth/" + comment.UserId;

        http.get<IUserViewComment>(url).then(async (res) => {
            console.log("User: ", res.data);
            console.log(APP_ENV.BASE_URL + "/images/" + res.data.image);
            // await sleep(1000);      
            setUser(res.data);
        });
    }
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
        switch (comment.medias.length) {
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

    return (

        <div className="comment">
            <div className={"CommentWrapper"} >
                <div className='CommentHeader'>
                    <div className={!comment?.ParentId ? "DataUserComment " : "DataUserComment CommentAnswer"}>
                        <Link to={`/profile/${user?.id}`}>
                            <img src={`${APP_ENV.BASE_URL + "/images/" + user?.image}`} className="rounded-circle" />
                        </Link>

                        <div className='nickAndTime'>
                            <Link to={`/profile/${user?.id}`} className="NickComment">{user?.name} &nbsp; <span className='time'> {comment?.CreatedAt}</span></Link>
                            <div className={!comment?.ParentId ? "CommentText " : "CommentText "}>
                                {comment?.CommentText}
                            </div>
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
                                                    style={{ height: '100%', width: '100%', overflow: 'hidden', maxHeight:"100px", maxWidth: "100px" }}
                                                />
                                                :
                                                <img
                                                    src={comment.medias.length == 1 ? `${APP_ENV.BASE_URL}/images/1280_` + img.path : `${APP_ENV.BASE_URL}/images/600_` + img.path}
                                                    className="img-fluid"
                                                    alt="Зображення"
                                                    style={{ height: '100%', width: '100%', overflow: 'hidden', maxHeight:"100px", maxWidth: "100px"}}
                                                />
                                            }

                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-primary time" onClick={() => console.log("Відповісти")}>Відповісти</button>
                        </div>
                               
                    </div>
                </div>

            </div>
        </div >
    );
};

export default CommentModel;