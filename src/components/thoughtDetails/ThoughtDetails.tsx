import React, { useEffect, useState } from 'react'
import { http } from '../../http';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IAuthUser } from '../../store/types';
import { APP_ENV } from '../../env';
import './ThoughtDetails.css';
import { ITweetView } from '../profile/types';
import Thought from '../common/thought/Thought';

export const ThoughtDetails = (props:any) => {
    const [loadingProfile, setLoadProfile] = useState<boolean>();
    const [loadingThought, setLoadThought] = useState<boolean>();
    const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
    const { id } = useParams()
    const [thought, setThought] = useState<ITweetView>();

    useEffect(() => {
        loadThought();
        console.log(id);
    }, [])

    const loadThought = () => {
        setLoadThought(true);

        var urlPost = "";
        if (isAuth && user != null)
            urlPost = `Tweets/${id}?UserId=${user.id}`;
        else
            urlPost = `Tweets/${id}`;
        http.get(urlPost).then(async (res) => {
            console.log("Post: ", res.data);
            // await sleep(500);
            setLoadThought(false);
            setThought(res.data);

        });
    }

    return (
        thought != undefined ? 

        <div className="TDetailsWrapper d-flex justify-content-center" style={{ backgroundImage: user?.bg != null ? `url(${APP_ENV.BASE_URL + "/images/" + user?.bg})` : "url(https://www.everwallpaper.co.uk/cdn/shop/collections/3D_Wallpaper.jpg?v=1660209305)" }}>
            <div className="TDetailsBackground " style={{ alignItems: loadingProfile ? "center" : "start", justifyContent: loadingProfile ? "center" : "start" }}>
                <Thought key={thought.id} tweet={thought} loadPosts={loadThought}  details={true}/>

                
            </div>
        </div>
        : 
        null
    )
}
