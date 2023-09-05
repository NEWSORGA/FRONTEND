import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { formHttp, http } from './http.ts';
import jwtDecode from "jwt-decode";
import { AuthUserActionType, IUser } from './store/types.ts';

if (localStorage.token && localStorage.getItem("user")) {
  http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
  formHttp.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

  const user = jwtDecode(localStorage.token) as IUser;
  store.dispatch({
    type: AuthUserActionType.LOGIN_USER, payload: {
      id: user.id,
      name: user.name,
      image: user.image,
      bg: user.bg,
      roles: user.roles
    } as IUser
  });
 
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>

)
