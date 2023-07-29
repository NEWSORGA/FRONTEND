import { Outlet } from 'react-router-dom'; 
import {GoogleOAuthProvider} from "@react-oauth/google";
const AuthLayout = () => {
    return (
        <div className="DefaultLayout"> 
            <GoogleOAuthProvider clientId="763864234936-s953ounakf8bemdaqva8hlao2dai2dj5.apps.googleusercontent.com">
                <Outlet />
            </GoogleOAuthProvider>
        </div>
    );
}
export default AuthLayout;