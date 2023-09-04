import { Col, Row } from 'react-bootstrap';
import './Header.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AuthUserActionType, IAuthUser } from '../../store/types';
import { APP_ENV } from '../../env';
import SearchInput from '../common/search/SearchInput';
import { useEffect, useRef, useState } from 'react';
import { formHttp, http } from '../../http';

const Header = () => {
    const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
    const navigate = useNavigate();
    const container = useRef<HTMLDivElement>(null);
    const [thoughtMenu, setThoughtMenu] = useState<boolean>(false);
    const btn = useRef<HTMLImageElement>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleClickOutside = (event: MouseEvent) => {

        console.log(btn);
        if (container.current && !container.current.contains(event.target as Node) && btn.current && !btn.current.contains(event.target as Node)) {
            setThoughtMenu(false);
        }
    }

    
    const logout = () => {
        delete http.defaults.headers.common["Authorization"];
        delete formHttp.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        dispatch({ type: AuthUserActionType.LOGOUT_USER });
        navigate("/login");
    }

    return (
        <div style={{ marginTop: "5px" }}>
            <div className="HeaderWrapper">
                <div className="BrandDiv">
                    <Link to='/' className="brand">Quixify</Link>
                    <div className="brand-subtext">but every do you want</div>
                </div>
                <div className="icon-search-wrapper">
                    <i className="bi bi-bell"></i>
                    <div className="SearchHeader" style={{ width: "80%" }}>
                        <SearchInput />
                    </div>
                    <i className="bi bi-arrow-through-heart"></i>
                </div>
                <div className="AuthWrapper">
                    <div className="AvatarDiv">
                        {isAuth ? <img ref={btn} src={`${APP_ENV.BASE_URL + "/images/" + user?.image}`} className="avatar" alt="Avatar" onClick={(e: any) => { e.preventDefault(); thoughtMenu ? setThoughtMenu(false) : setThoughtMenu(true) }} /> : <Link to="/login">Login</Link>}
                    </div>
                    <div className='dropdownMenuHeader' ref={container} style={{ display: thoughtMenu ? "block" : "none", opacity: thoughtMenu ? "100%" : "0%" }}>
                        <ul>
                            <li onClick={(e: any) => { navigate("/profile/" + user?.id); navigate(0) }}>Profile</li>
                            <li onClick={(e: any) => { navigate("/settings/");  }}>Settings</li>
                            <li className='logout' onClick={(e: any) => { logout(); }}>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Header;