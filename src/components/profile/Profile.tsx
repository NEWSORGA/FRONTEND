import { Col, Form, Row } from 'react-bootstrap';
import './Profile.css'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Thought from '../common/thought/Thought';
import { useEffect, useState, } from 'react';
import { useSearchParams, } from 'react-router-dom';
import { ITweetView, IUserView } from './types';
import { http } from '../../http';
import { APP_ENV } from '../../env';
import { useSelector } from "react-redux";
import { IAuthUser } from '../../store/types';
import { url } from 'inspector';
import { MutatingDots } from 'react-loader-spinner';

const Profile = () => {
    const [userPage, setUser] = useState<IUserView>();
    const [posts, setPosts] = useState<ITweetView[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
    const [loadProfile, setLoadProfile] = useState<boolean>();
    const [loadPosts, setLoadPosts] = useState<boolean>();

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        var id = searchParams.get("id");
        setLoadProfile(true);
        setLoadPosts(true);
        http.get("auth/" + id).then(async (res) => {
            console.log("User: ", res.data);
            console.log(APP_ENV.BASE_URL + "/images/" + res.data.image);
            await sleep(1000);
            setLoadProfile(false);
            setUser(res.data);


        });
        var urlPost = "";
        if (isAuth && user != null)
            urlPost = `Tweets/GetUserTweets?UserId=${user.id}&UserPageId=${id}`;
        else
            urlPost = `Tweets/GetUserTweets?UserPageId=${id}`;
        http.get(urlPost).then(async (res) => {
            console.log("Post: ", res.data);
            await sleep(1000);
            setLoadPosts(false);
            setPosts(res.data);
            
        });
    }, [])
    return (

        <>
            <div className="ProfileWrapper d-flex justify-content-center"
                style={{ backgroundImage: userPage?.backgroundImage != null ? `url(${APP_ENV.BASE_URL + "/images/" + userPage?.backgroundImage})` : "url(https://www.everwallpaper.co.uk/cdn/shop/collections/3D_Wallpaper.jpg?v=1660209305)" }}>
                <div className="ProfileBackground " style={{ backgroundColor: "rgba(25,25,25,.9)", display: loadProfile ? "flex" : "block" }}>
                    {loadProfile ? <MutatingDots
                        height="100"
                        width="100"
                        color="#9B2222"
                        secondaryColor='#9B2222'
                        radius='12.5'
                        ariaLabel="mutating-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass="loadProfile"
                        visible={loadProfile}
                    /> : (<>
                        <Row style={{ height: "200px" }}>
                            <Col xs="3" className='d-flex justify-content-center'>
                                <div className="ProfileAvatar"
                                    style={{ backgroundImage: `url(${APP_ENV.BASE_URL + "/images/" + userPage?.image})` }}>
                                </div>
                            </Col>
                            <Col xs="9">
                                <div className="UserDataProfile m-3 mt-4">
                                    <div className="NickNameProfile">
                                        <a>{userPage?.name}</a>
                                    </div>
                                    <div className="CountryProfile">
                                        <span className={`fi fi-${userPage?.countryCode}`}></span>
                                        <a> {userPage?.country}</a>
                                    </div>
                                    <div className="StatusProfile mt-3 w-50">
                                        <a>{userPage?.description}</a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="WritePost m-3 mt-5">
                            <Form.Group>
                                <Form.Label>Whatever you think</Form.Label>
                                <Form.Control
                                    placeholder='What?'
                                    as="textarea"
                                    className='profileTextArea' />
                            </Form.Group>
                            <div className="d-flex justify-content-left">
                                <div className="btn btnProfile">Send</div>
                            </div>
                        </div>
                        <div className="AllPostsProfile" style={{ display: loadPosts ? "flex" : "block" }}>
                            {loadPosts ? <MutatingDots
                                height="100"
                                width="100"
                                color="#9B2222"
                                secondaryColor='#9B2222'
                                radius='12.5'
                                ariaLabel="mutating-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass="loadProfile"
                                visible={loadPosts} />
                                :
                                posts.map(p => {
                                    return (
                                        <Thought tweet={p} />
                                    )
                                })
                            }


                        </div>
                    </>

                    )}
                </div>
            </div>
        </>


    );
};
export default Profile;