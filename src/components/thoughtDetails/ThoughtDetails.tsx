import React, { useEffect, useState } from 'react'
import { http } from '../../http';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IAuthUser } from '../../store/types';
import { APP_ENV } from '../../env';
import './ThoughtDetails.css';
import { ITweetView } from '../profile/types';
import Thought from '../common/thought/Thought';
import { CreateComment } from '../common/createComment/CreateComment';
import { ICommentViewModel } from '../comments/show/types';
import { MutatingDots } from 'react-loader-spinner';
import CommentModel from '../comments/component/CommentModel';
import ShowCommentComponent from '../comments/show/ShowCommentComponent';

export const ThoughtDetails = (props: any) => {
    const [loadingComments, setLoadComments] = useState<boolean>(false);
    const [loadingThought, setLoadThought] = useState<boolean>(true);
    const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
    const { id } = useParams()
    const [thought, setThought] = useState<ITweetView>();
    const [comments, setComments] = useState<ICommentViewModel[]>();
    useEffect(() => {
        setLoadThought(true);
        loadThought();
        loadComments();
        console.log(id);
    }, [])

    const loadThought = async () => {


        var urlPost = "";
        if (isAuth && user != null)
            urlPost = `Tweets/${id}?UserId=${user.id}`;
        else
            urlPost = `Tweets/${id}`;
        await http.get(urlPost).then(async (res) => {
            console.log("Post: ", res.data);
            // await sleep(500);

            setThought(res.data);

            setThought(res.data);
            setLoadThought(false);
        });
    }

    const loadComments = () => {

        var urlPost = "";
        // if (isAuth && user != null)
        //     urlPost = `Comments/${id}?UserId=${user.id}`;
        // else
        urlPost = `Comments/${id}`;
        setLoadComments(true);
        http.get(urlPost).then(async (res) => {
            console.log("Comments: ", res.data);
            // await sleep(500);
            // setLoadThought(false);
            setComments(res.data);
            setLoadComments(false);
        });

    }

    return (

        <div className="TDetailsWrapper d-flex justify-content-center" style={{ backgroundImage: user?.bg != null ? `url(${APP_ENV.BASE_URL + "/images/" + user?.bg})` : "url(https://www.everwallpaper.co.uk/cdn/shop/collections/3D_Wallpaper.jpg?v=1660209305)" }}>

            <div className="TDetailsBackground " style={{ alignItems: loadingThought ? "center" : "start", justifyContent: loadingThought ? "center" : "start", display: "flex", flexDirection: "column" }}>
                {
                    loadingThought ?

                        <MutatingDots
                            height="100"
                            width="100"
                            color="#EB4C42"
                            secondaryColor='#EB4C42'
                            radius='12.5'
                            ariaLabel="mutating-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass="loadProfile"
                            visible={loadingThought}
                        />
                        :
                        <>
                            <Thought key={thought.id} tweet={thought} loadPosts={loadThought} details={true} />
                            <CreateComment thoughtId={thought?.id} loadComments={loadComments}></CreateComment>
                        </>

                }

                {
                    loadingComments && loadingThought == false ?

                        <MutatingDots
                            height="100"
                            width="100"
                            color="#EB4C42"
                            secondaryColor='#EB4C42'
                            radius='12.5'
                            ariaLabel="mutating-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass="loadProfile"
                            visible={loadingComments}
                        />
                        :
                        // comments?.map(item => {
                        //     return <CommentModel comment={item}></CommentModel>
                        // })
                        
                        <ShowCommentComponent Comments={comments} children={false} loadComments={loadComments}/>
                }
            </div>
        </div>
    )
}
