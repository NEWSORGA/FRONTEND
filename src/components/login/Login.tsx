import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import { AuthUserActionType, ILoginGoogleUser, ILoginResult, IUser } from '../../store/types';
// import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import axios from 'axios';
import { formHttp, http } from '../../http';

const Login = () => {
    const navigator = useNavigate();
    const dispatch = useDispatch();

    return (

        <div className="page-container">
            <div className="card">
                <div className="container">
                    <div className="body d-md-flex align-items-center justify-content-between">
                        <div className="box-1 mt-md-0 mt-5">
                            <img src="https://i.pinimg.com/564x/e8/fc/f1/e8fcf1d3816963575e037aa879866441.jpg"
                                className="" alt="" />
                        </div>
                        <div className=" box-2 d-flex flex-column h-100">
                            <div className="mt-5">
                                <p className="mb-1 h-1 mb-3 title">Login</p>
                                <p className="mb-2 mb-3 desc">Share your thouhts with the world form today.</p>
                                <div className="d-flex flex-column">
                                    <p className="mb-2 mb-3 continue">Continue with...</p>
                                    <div className='googleLogin'>
                                        <GoogleLogin
                                            text='continue_with'
                                            shape='square'

                                            onSuccess={(credentialResponse: any) => {

                                                console.log(credentialResponse.credential);
                                                if (credentialResponse.credential != null) {
                                                    axios.get('https://api.geoapify.com/v1/ipinfo?apiKey=d74e417fb77f459daa5e229304c08a0e')
                                                        .then(async (response: any) => {
                                                            const country = response.data.country;
                                                            console.log('User Country:', country);
                                                            var user: ILoginGoogleUser = {
                                                                token: credentialResponse.credential,
                                                                country: country.name,
                                                                countryCode: country.iso_code
                                                            }

                                                            formHttp.post<ILoginResult>("/auth/loginGoogle", user).then((reg) => {

                                                                localStorage.token = reg.data.token;

                                                                http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
                                                                formHttp.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
                                                                console.log("return");
                                                                const user2 = jwtDecode(localStorage.token) as IUser;
                                                                dispatch({
                                                                    type: AuthUserActionType.LOGIN_USER, payload: {
                                                                        id: user2.id,
                                                                        name: user2.name,
                                                                        image: user2.image,
                                                                        email: user2.email
                                                                    } as IUser
                                                                });
                                                                console.log("nav");
                                                                navigator("/profile?id=" + user2?.id);
                                                            });
                                                        })
                                                        .catch((error) => {
                                                            console.log('Error fetching user country:', error);
                                                        });

                                                }

                                            }}

                                            onError={() => {
                                                console.log('Login Failed');
                                            }}
                                        />
                                        
                                      
                                    </div>



                                </div>
                            </div>
                        </div>
                        <Link to="/" className="fas fa-times"></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
