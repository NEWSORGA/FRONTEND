import { Outlet } from "react-router-dom"; 
import Header from "../header/Header";
import './Default-Layout.css';
const DefaultLayout = () => {
    return (
        <div className="DefaultLayout">
            <Header />
            <Outlet />
        </div>
    );
}
export default DefaultLayout;