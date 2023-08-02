import { Col, Form, Row } from 'react-bootstrap';
import './Profile.css'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Thought from '../common/thought/Thought';
import { useEffect, useState, } from 'react';
import { useSearchParams, } from 'react-router-dom';
import { ITweetView, IUserView } from './types';
import { http } from '../../http';
import { APP_ENV } from '../../env';


const Profile = () => {
    const [user, setUser] = useState<IUserView>();
    const [posts, setPosts] = useState<ITweetView[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
       var id = searchParams.get("id");
        http.get("auth/"+id).then((res) => {
            console.log("User: ", res.data);
            console.log(APP_ENV.BASE_URL + "/images/" + res.data.image);
            setUser(res.data);
        });
        http.get(`Tweets/GetUserTweets?UserId=6&UserPageId=${id}`).then((res) => {
            console.log("Post: ", res.data);
    
            setPosts(res.data);
        });
    }, [])
    return (
        <>
            <div className="ProfileWrapper d-flex justify-content-center"
                style={{ backgroundImage: user?.backgroundImage != null ? `url(${APP_ENV.BASE_URL + "/images/" + user?.backgroundImage})` : "url(https://www.everwallpaper.co.uk/cdn/shop/collections/3D_Wallpaper.jpg?v=1660209305)" }}>
                <div className="ProfileBackground" style={{ backgroundColor: "rgba(25,25,25,.9)" }}>
                    <Row style={{ height: "200px" }}>
                        <Col xs="3" className='d-flex justify-content-center'>
                            <div className="ProfileAvatar"
                                style={{ backgroundImage: `url(${APP_ENV.BASE_URL + "/images/" + user?.image})` }}>
                            </div>
                        </Col>
                        <Col xs="9">
                            <div className="UserDataProfile m-3 mt-4">
                                <div className="NickNameProfile">
                                    <a>{user?.name}</a>
                                </div>
                                <div className="CountryProfile">
                                    <span className={`fi fi-${user?.countryCode}`}></span>
                                    <a> {user?.country}</a>
                                </div>
                                <div className="StatusProfile mt-3 w-50">
                                    <a>{user?.description}</a>
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
                    <div className="AllPostsProfile">
                        {posts.map(p => {
                            return (
                                <Thought avatar={`${APP_ENV.BASE_URL + "/images/" + p.user.image}`} 
                        nick={p.user.name} text={p.tweetText}></Thought>
                            )
                        })}
                        
                    </div>
                </div>
            </div>
        </>
    );
};
export default Profile;