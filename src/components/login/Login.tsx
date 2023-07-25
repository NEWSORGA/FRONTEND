import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
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
                                <div className="d-flex align-items-center justify-content-center">
                                    <a href="#" className="box me-2">
                                        <span className="fab fa-google mb-2"></span>
                                        <p className="mb-0">Google</p>
                                        <i className="bi bi-google fa-xs" style={{fontSize:"20px"}}></i>
                                    </a>
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