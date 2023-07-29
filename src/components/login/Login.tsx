import {Link} from 'react-router-dom';
import './Login.css';
import {useGoogleLogin} from '@react-oauth/google';
import axios from "axios";
// import jwt_decode from "jwt-decode";

const Login = () => {

    const loginByGoogle = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log("Get token google ", tokenResponse);

            // Use the access token to fetch user information from Google API
            axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                },
            })
                .then((res) => {
                    console.log('User Info:', res.data);
                    // You can access the user information from res.data object
                })
                .catch((error) => {
                    console.log('Error fetching user information:', error);
                });

        },
    });

    return (

            <div className="page-container">
                <div className="card">
                    <div className="container">
                        <div className="body d-md-flex align-items-center justify-content-between">
                            <div className="box-1 mt-md-0 mt-5">
                                <img src="https://i.pinimg.com/564x/e8/fc/f1/e8fcf1d3816963575e037aa879866441.jpg"
                                     className="" alt=""/>
                            </div>
                            <div className=" box-2 d-flex flex-column h-100">
                                <div className="mt-5">
                                    <p className="mb-1 h-1">Login</p>
                                    <p className="mb-2">Share your thouhts with the world form today.</p>
                                    <div className="d-flex flex-column ">
                                        <p className="mb-2">Continue with...</p>
                                        {/*<GoogleLogin*/}
                                        {/*    onSuccess={(credentialResponse ) => {*/}
                                        {/*        console.log(credentialResponse);*/}
                                        {/*        if(credentialResponse.credential!=null) {*/}
                                        {/*            const userObject = jwt_decode(credentialResponse.credential);*/}
                                        {/*            console.log("User object", userObject);*/}
                                        {/*        }*/}
                                        {/*    }}*/}
                                        {/*    onError={() => {*/}
                                        {/*        console.log('Login Failed');*/}
                                        {/*    }}*/}
                                        {/*/>*/}
                                        <div onClick={() => loginByGoogle()}
                                             className="d-flex align-items-center justify-content-center">
                                            Sign in with Google 🚀{' '}
                                        </div>
                                        <div className="mt-3">
                                            <p className="mb-0">Dont have an account?</p>
                                            <div className="btn btn-primary"><Link to='/register'
                                                                                   className="fas fa-chevron-right ms-1">Register</Link><span
                                                className="fas fa-chevron-right ms-1"></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="fas fa-times"></span>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Login;
