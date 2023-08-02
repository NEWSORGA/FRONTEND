
import './Profile.css'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Thought from '../common/thought/Thought';
import { ChangeEvent, useEffect, useRef, useState, } from 'react';
import { useSearchParams, } from 'react-router-dom';
import { ITweetCreate, ITweetView, IUploadImage, IUploadImageResult, IUserView } from './types';
import { formHttp, http } from '../../http';
import { APP_ENV } from '../../env';
import { useSelector } from "react-redux";
import { IAuthUser } from '../../store/types';
import { MutatingDots } from 'react-loader-spinner';
import { useFormik } from "formik";
import * as yup from "yup";

const Profile = () => {
    const [userPage, setUser] = useState<IUserView>();
    const [posts, setPosts] = useState<ITweetView[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
    const [loadingProfile, setLoadProfile] = useState<boolean>();
    const [loadingPosts, setLoadPosts] = useState<boolean>();
    const [images, setImages] = useState<IUploadImageResult[]>([]);

    useEffect(() => {
        loadProfile();
        loadPosts();
    }, [])

    const loadPosts = () => {
        var id = searchParams.get("id");
        setLoadPosts(true);
        
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
    }

    const loadProfile = () => {
        var id = searchParams.get("id");
        setLoadProfile(true);
        http.get("auth/" + id).then(async (res) => {
            console.log("User: ", res.data);
            console.log(APP_ENV.BASE_URL + "/images/" + res.data.image);
            await sleep(1000);
            setLoadProfile(false);
            setUser(res.data);
        });
    }

    const initValues: ITweetCreate = {
        tweetText: "",
        mediaIds: [],
        repostedId: null
    };

    const createSchema = yup.object({
       
    });

    const onSubmitFormikData = (values: ITweetCreate) => {
        console.log("Values", values);
        formHttp.post('tweets/createTweet', values)
            .then(resp => {
                if(resp.data == "Done"){
                    formik.resetForm();
                    setImages([]);
                    loadPosts();
                }
            });

    }



    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData
    });

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    const useAutosizeTextArea = (
        textAreaRef: HTMLTextAreaElement | null,
        value: string
    ) => {
        useEffect(() => {
            if (textAreaRef) {
                // We need to reset the height momentarily to get the correct scrollHeight for the textarea
                textAreaRef.style.height = "0px";
                const scrollHeight = textAreaRef.scrollHeight;

                // We then set the height directly, outside of the render loop
                // Trying to set this with state or a ref will product an incorrect value.
                textAreaRef.style.height = scrollHeight + "px";
            }
        }, [textAreaRef, value]);
    };

    const textAreaRef = useRef<HTMLTextAreaElement>(null);



    const handleChangeText = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = evt.target?.value;

        setFieldValue("tweetText", val);
    };



    const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            console.log("files");
            const file = files[0];
            const allowTypes = ["image/jpeg", "image/png", "image/jpg"];
            if (!allowTypes.includes(file.type)) {
                alert("Невірний формат файлу");
                return;
            }
            const upload: IUploadImage = {
                media: file
            }
            console.log(upload);
            formHttp.post<IUploadImageResult>('/tweets/uploadMedia', upload, {
            })
                .then(resp => {
                    setImages([...images, resp.data]);
                    setFieldValue("mediaIds", [...values.mediaIds, resp.data.id]);
                })
                .catch(bad => {
                    console.log("Bad request", bad);
                })

        }

    }


    const onDeleteImageHandler = async (id: number) => {
        try {
            await http.delete(`api/products/DeleteImage/${id}`);
            setImages(images?.filter(x => x.id !== id));
        } catch {
            console.log("Delete bad request");
        }
    }
    const { values, handleSubmit, setFieldValue } = formik;

    useAutosizeTextArea(textAreaRef.current, values.tweetText);
    return (

        <>
            <div className="ProfileWrapper d-flex justify-content-center"
                style={{ backgroundImage: userPage?.backgroundImage != null ? `url(${APP_ENV.BASE_URL + "/images/" + userPage?.backgroundImage})` : "url(https://www.everwallpaper.co.uk/cdn/shop/collections/3D_Wallpaper.jpg?v=1660209305)" }}>
                <div className="ProfileBackground " style={{ display: loadingProfile ? "flex" : "block" }}>
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
                            <div className="ProfileAvatar"
                                style={{ backgroundImage: `url(${APP_ENV.BASE_URL + "/images/" + userPage?.image})` }}>
                            </div>
                            <div>
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
                            </div>
                        </div>
                        <div className="WritePost">
                            <form onSubmit={handleSubmit}>
                                <div className='inputBlock'>
                                    <textarea className='inputPost' name="tweetText" onChange={handleChangeText} ref={textAreaRef} rows={1} value={values.tweetText} placeholder="What's new?" />
                                    <div className='images' style={{ gridTemplateColumns: "1fr 1fr" }}>
                                        {images.map((img) => (
                                            <>
                                                <div className="col position-relative">
                                                    <div className="imgUp">
                                                        <div className="imagePreview align-items-center">
                                                            <img
                                                                src={`${APP_ENV.BASE_URL}/images/300_` + img.path}
                                                                className="img-fluid"
                                                                alt="Зображення"
                                                                style={{ width: '100%', overflow: 'hidden' }}
                                                            />

                                                        </div>




                                                    </div>
                                                </div>

                                            </>
                                        ))}
                                    </div>

                                    <div className='buttons'>
                                        <div className='actions'>
                                            <div className="image-upload inputBtn">
                                                <label htmlFor="file-input">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 32 32" version="1.1">

                                                        <title>image-picture</title>
                                                        <desc>Created with Sketch Beta.</desc>
                                                        <defs>

                                                        </defs>
                                                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <g id="Icon-Set" transform="translate(-360.000000, -99.000000)" fill="#EB4C42">
                                                                <path d="M368,109 C366.896,109 366,108.104 366,107 C366,105.896 366.896,105 368,105 C369.104,105 370,105.896 370,107 C370,108.104 369.104,109 368,109 L368,109 Z M368,103 C365.791,103 364,104.791 364,107 C364,109.209 365.791,111 368,111 C370.209,111 372,109.209 372,107 C372,104.791 370.209,103 368,103 L368,103 Z M390,116.128 L384,110 L374.059,120.111 L370,116 L362,123.337 L362,103 C362,101.896 362.896,101 364,101 L388,101 C389.104,101 390,101.896 390,103 L390,116.128 L390,116.128 Z M390,127 C390,128.104 389.104,129 388,129 L382.832,129 L375.464,121.535 L384,112.999 L390,118.999 L390,127 L390,127 Z M364,129 C362.896,129 362,128.104 362,127 L362,126.061 L369.945,118.945 L380.001,129 L364,129 L364,129 Z M388,99 L364,99 C361.791,99 360,100.791 360,103 L360,127 C360,129.209 361.791,131 364,131 L388,131 C390.209,131 392,129.209 392,127 L392,103 C392,100.791 390.209,99 388,99 L388,99 Z" id="image-picture" sketch: type="MSShapeGroup">

                                                                </path>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </label>

                                                <input id="file-input" onChange={onChangeImageHandler} style={{ display: 'none' }} height={0} width={0} type="file" />
                                            </div>
                                        </div>

                                        <button className="btnProfile" type='submit'>Send</button>
                                    </div>

                                </div>
                            </form>



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