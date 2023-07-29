import { Outlet } from "react-router-dom";  
import './Default-Layout.css'; 
const DefaultLayout = () => {
    return (
        <div className="DefaultLayout"> 
            <Outlet /> 
        </div>
    );
}
export default DefaultLayout;