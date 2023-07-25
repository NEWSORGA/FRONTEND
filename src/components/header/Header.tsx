import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <>
            <div className='HeaderWrapper'>
                <div className='LogoWrapper'>
                    <Link to={"/"}> 
                    </Link>
                    <a>Autubus</a>
                </div>
                <div className='MenuWrapper'>
                    <ul>
                        <li><Link to={"/login"}>Login</Link></li>
                        <li><Link to={"/register"}>Register</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
}
export default Header;