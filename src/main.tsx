import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { formHttp, http } from './http.ts';
import jwtDecode from "jwt-decode";
import { AuthUserActionType, IUser } from './store/types.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';

if (localStorage.token) {
  http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
  formHttp.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

  const user = jwtDecode(localStorage.token) as IUser;
  store.dispatch({
    type: AuthUserActionType.LOGIN_USER, payload: {
      id: user.id,
      name: user.name,
      image: user.image
    } as IUser
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId='349322929062-ukqi0ffks12d1vg6oh08po0edev5n459.apps.googleusercontent.com'>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>

  </Provider>

)
