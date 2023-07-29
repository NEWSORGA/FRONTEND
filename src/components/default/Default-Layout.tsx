import './Default-Layout.css'; 
import Header from "../header/Header";
import Footer from '../common/footer/Footer';
import { Outlet } from 'react-router-dom';
const DefaultLayout = () => {
    return (
        <div className="DefaultLayout"> 
            <Header/>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
}
export default DefaultLayout;
