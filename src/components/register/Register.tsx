import { Link } from 'react-router-dom';
import './Register.css';
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { ICreateGoogleUser } from './types';
import { formHttp } from '../../http';


const Register = () => {

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

                    axios.get('https://api.geoapify.com/v1/ipinfo?apiKey=d74e417fb77f459daa5e229304c08a0e')
                    .then((response) => {
                        const country = response.data.country;
                        console.log('User Country:', country);
                        var user:ICreateGoogleUser = {
                            name: res.data.name,
                            email: res.data.email,
                            image: res.data.picture,
                            country: country.name,
                            countryCode: country.iso_code,
                            token: tokenResponse.access_token
                        }

                        formHttp.post("/auth/createGoogle", user).then((reg) => {
                            console.log(reg.data);
                        });
                    })
                    .catch((error) => {
                        console.log('Error fetching user country:', error);
                    });
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
                            <img src="https://i.pinimg.com/564x/e8/ce/8b/e8ce8b7387c34bb794cde48f9452e665.jpg"
                                className="" alt="" />
                        </div>
                        <div className=" box-2 d-flex flex-column h-100">
                            <div className="mt-5">
                                <p className="mb-1 h-1">Create Account.</p>
                                <p className="mb-2 mb-3">Share your thouhts with the world form today.</p>
                                <div className="d-flex flex-column ">
                                    <p className="mb-2 mb-3">Continue with...</p>
                                    <div onClick={() => loginByGoogle()}
                                        className="mb-3 d-flex align-items-center justify-content-center cursor-pointer bgDelete">
                                        Sign in with Google 🚀{' '}
                                    </div>
                                    <div className="mt-3">
                                        <p className="mb-0 mb-3">Already have an account?</p>
                                        <div className="mb-3 mg-2 btn-primary cursor-pointer bgDelete"><Link to='/login'
                                            className="fas fa-chevron-right ms-1">Log
                                            in</Link><span className="fas fa-chevron-right ms-1"></span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto">
                                <p className="footer mb-0 mt-md-0 mt-4">By register you agree with our
                                    <span className="p-color me-1"> terms and conditions</span>and
                                    <span className="p-color ms-1">privacy policy</span>
                                </p>
                            </div>
                        </div>
                        <Link to="/" className="fas fa-times"></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
