import { Link } from 'react-router-dom';
import './Login.css';
import { useEffect } from 'react';

const Login = () => {

    const handleGoogleComplete = (resp: any) => {
        const { credential } = resp;
        console.log("-------Google auth----------- ", credential)
    }
    useEffect(() => {
        window.google.accounts!.id.initialize({
            client_id: "763864234936-s953ounakf8bemdaqva8hlao2dai2dj5.apps.googleusercontent.com",
            callback: handleGoogleComplete
        });

        window.google.accounts.id.renderButton(
            document.getElementById("customBtn"),
            {
                theme: "outline",
                size: 'large',
                type: 'icon',
                width: "40"
                //text: "signin",
                //locale: "uk-ua"
            });
    }, []);

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
                                <p className="mb-1 h-1">Login</p>
                                <p className="mb-2">Share your thouhts with the world form today.</p>
                                <div className="d-flex flex-column ">
                                    <p className="mb-2">Continue with...</p>
                                    <div id="customBtn" className="d-flex align-items-center justify-content-center"> 
                                    </div>
                                    <div className="mt-3">
                                        <p className="mb-0">Dont have an account?</p>
                                        <div className="btn btn-primary"><Link to='/register' className="fas fa-chevron-right ms-1">Register</Link><span className="fas fa-chevron-right ms-1"></span></div>
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