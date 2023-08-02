import { Col, Row } from 'react-bootstrap';
import './Header.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { IAuthUser } from '../../store/types';
import { APP_ENV } from '../../env';

const Header = () => {
    const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);

    return (
        <div className='header'>
            <div className='headerBlock'>
                <div className="BrandDiv">
                    <Link to='/' className="brand">Quixify</Link>
                    <div className="brand-subtext">but every do you want</div>
                </div>
                <div className='menu'>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="34px" height="34px"><path fill='#D6D6D6' d="M 32 8 C 31.08875 8 30.178047 8.3091875 29.435547 8.9296875 L 8.8007812 26.171875 C 8.0357812 26.810875 7.7634844 27.925203 8.2714844 28.783203 C 8.9184844 29.875203 10.35025 30.088547 11.28125 29.310547 L 31.677734 12.269531 C 31.864734 12.113531 32.135266 12.113531 32.322266 12.269531 L 52.71875 29.3125 C 53.09275 29.6255 53.546047 29.777344 53.998047 29.777344 C 54.693047 29.777344 55.382672 29.416656 55.763672 28.722656 C 56.228672 27.874656 55.954891 26.803594 55.212891 26.183594 L 52 23.498047 L 52 15 C 52 13.895 51.105 13 50 13 L 48 13 C 46.895 13 46 13.895 46 15 L 46 18.484375 L 34.564453 8.9296875 C 33.821953 8.3091875 32.91125 8 32 8 z M 32 16 L 12 32.705078 L 12 47 C 12 49.761 14.239 52 17 52 L 47 52 C 49.761 52 52 49.761 52 47 L 52 32.705078 L 32 16 z M 28 32 L 36 32 C 37.105 32 38 32.895 38 34 L 38 48 L 26 48 L 26 34 C 26 32.895 26.895 32 28 32 z" /></svg>
                    </a>
                    <a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24" fill="none"><path fill="#D6D6D6" fill-rule="evenodd" clip-rule="evenodd" d="M9.5 17c1.71 0 3.287-.573 4.55-1.537l4.743 4.744a1 1 0 0 0 1.414-1.414l-4.744-4.744A7.5 7.5 0 1 0 9.5 17zM15 9.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
                    </a>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0.7 24 24.7" fill="none">
                            <path fill="#D6D6D6" d="M12 3C9.56586 3 7.59259 4.95716 7.59259 7.37143C7.59259 9.7857 9.56586 11.7429 12 11.7429C14.4341 11.7429 16.4074 9.7857 16.4074 7.37143C16.4074 4.95716 14.4341 3 12 3Z" />
                            <path fill="#D6D6D6" d="M14.601 13.6877C12.8779 13.4149 11.1221 13.4149 9.39904 13.6877L9.21435 13.7169C6.78647 14.1012 5 16.1783 5 18.6168C5 19.933 6.07576 21 7.40278 21H16.5972C17.9242 21 19 19.933 19 18.6168C19 16.1783 17.2135 14.1012 14.7857 13.7169L14.601 13.6877Z"/>
                        </svg>
                    </a>
                    
                    
                </div>
                <div className='profile'>
                    {isAuth ? <img src={`${APP_ENV.BASE_URL + "/images/" + user?.image}`} className="profileAvatar" alt="Avatar" /> : <Link to="/login">Login</Link>}
                </div>
            </div>
        </div>
    );
}
export default Header;