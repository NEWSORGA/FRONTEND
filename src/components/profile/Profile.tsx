
import './Profile.css'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Thought from '../common/thought/Thought';
import { useEffect, useState, } from 'react';
import { useParams, } from 'react-router-dom';
import { ITweetView, IUserView } from './types';
import { http } from '../../http';
import { APP_ENV } from '../../env';
import { useSelector } from "react-redux";
import { IAuthUser } from '../../store/types';
import { MutatingDots } from 'react-loader-spinner';
import { CreatePost } from '../common/createPost/CreatePost';
const Profile = () => {
    const [userPage, setUser] = useState<IUserView>();
    const [posts, setPosts] = useState<ITweetView[]>([]);
    
    const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
    const [loadingProfile, setLoadProfile] = useState<boolean>();
    const [loadingPosts, setLoadPosts] = useState<boolean>();
    const [followed, setFollowed] = useState<boolean>();
    const { id } = useParams();
    useEffect(() => {
        loadProfile();
        loadPosts();

    }, [])

    const loadPosts = () => {
        setLoadPosts(true);

        var urlPost = "";
        if (isAuth && user != null)
            urlPost = `Tweets/GetUserTweets?UserId=${user.id}&UserPageId=${id}`;
        else
            urlPost = `Tweets/GetUserTweets?UserPageId=${id}`;
        http.get(urlPost).then(async (res) => {
            console.log("Post: ", res.data);
            // await sleep(500);
            setLoadPosts(false);
            setPosts(res.data);

        });
    }

    const loadProfile = () => {
        setLoadProfile(true);
        let url = "";
        if (isAuth)
            url = "auth/" + id + "?ForUser=" + user?.id;
        else {
            url = "auth/" + id;
        }
        http.get<IUserView>(url).then(async (res) => {
            console.log("User: ", res.data);
            console.log(APP_ENV.BASE_URL + "/images/" + res.data.image);
            // await sleep(1000);
            setLoadProfile(false);
            setUser(res.data);
            setFollowed(res.data.isFollowed);
        });
    }



    // function sleep(ms: number) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    const follow = () => {
        if (followed == false) {
            setFollowed(true);
            console.log("followed", followed);
        }
        else {
            setFollowed(false);
            console.log("unfollowed", followed);
        }

        http.post("/Follow/" + userPage?.id).then((res) => {
            if (res.data == "Followed") {
                setFollowed(true);
            }
            else if (res.data == "unFollowed") {
                setFollowed(false);
            }


        });
    }


    return (

        <>
            <div className="ProfileWrapper d-flex justify-content-center"
                style={{ backgroundImage: userPage?.backgroundImage != null ? `url(${APP_ENV.BASE_URL + "/images/" + userPage?.backgroundImage})` : "url(https://www.everwallpaper.co.uk/cdn/shop/collections/3D_Wallpaper.jpg?v=1660209305)" }}>
                <div className="ProfileBackground " style={{ alignItems: loadingProfile ? "center" : "start", justifyContent: loadingProfile ? "center" : "start" }}>
                    {loadingProfile ? <MutatingDots
                        height="100"
                        width="100"
                        color="#EB4C42"
                        secondaryColor='#EB4C42'
                        radius='12.5'
                        ariaLabel="mutating-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass="loadProfile"
                        visible={loadingProfile}
                    /> : (<>
                        <div className='profileLine'>
                            <div className="ProfileAvatarBlock">
                                <img src={APP_ENV.BASE_URL + "/images/" + userPage?.image} className='ProfileAvatar' />

                            </div>
                            <div className="UserDataProfile">
                                <div className="NickNameProfile">
                                    <a>{userPage?.name}</a>
                                </div>
                                <div className="CountryProfile">
                                    <span className={`fi fi-${userPage?.countryCode} flag`}></span>
                                    <a> {userPage?.country}</a>
                                </div>
                                <div className="StatusProfile">
                                    <a>{userPage?.description}</a>
                                </div>
                            </div>
                            <div className='profileActions'>
                                {user?.id != userPage?.id ?
                                    <button onClick={follow} className={followed ? 'followed folBtn' : "follow folBtn"}>{followed ? 'Unfollow' : "Follow"}</button>
                                    :
                                    null
                                }

                            </div>
                        </div>
                        <div className='contentStatistic'>
                            <div className='leftContent'>

                                <div className='createPost'>

                                    {user?.id == userPage?.id ?
                                        <CreatePost loadPosts={loadPosts}></CreatePost>
                                        :
                                        null
                                    }

                                </div>

                                <div className="AllPostsProfile" style={{ display: loadingPosts ? "flex" : "block" }}>
                                    {loadingPosts ? <MutatingDots
                                        height="100"
                                        width="100"
                                        color="#EB4C42"
                                        secondaryColor='#EB4C42'
                                        radius='12.5'
                                        ariaLabel="mutating-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="loadProfile"
                                        visible={loadingPosts} />
                                        :
                                        posts.map(p => {
                                            return (
                                                <Thought key={p.id} tweet={p} loadPosts={loadPosts} details={false}/>
                                            )
                                        })
                                    }


                                </div>
                            </div>
                            <div className='rightContent'>
                                <div className='statistic boxRounded'>
                                    <div className='statItem'>
                                        <span className='item'>Followers</span>
                                        <span className='count'>{userPage?.followers}</span>
                                    </div>
                                    <div className='statItem'>
                                        <span className='item'>Following</span>
                                        <span className='count'>{userPage?.following}</span>
                                    </div>
                                    <div className='statItem'>
                                        <span className='item'>Likes</span>
                                        <span className='count'>{userPage?.likes}</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </>

                    )}
                </div>
            </div>
        </>


    );
};
export default Profile;