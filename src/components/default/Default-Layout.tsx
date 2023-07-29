import { Outlet } from "react-router-dom";
import './Default-Layout.css';
import {GoogleOAuthProvider} from "@react-oauth/google";
const DefaultLayout = () => {
    return (
        <div className="DefaultLayout"> 
            <GoogleOAuthProvider clientId="763864234936-s953ounakf8bemdaqva8hlao2dai2dj5.apps.googleusercontent.com">
                <Outlet />
            </GoogleOAuthProvider>
        </div>
    );
}
export default DefaultLayout;
