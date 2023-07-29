import './App.css'
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/default/Default-Layout';
import Register from './components/register/Register';
import Login from './components/login/Login';
import MainPage from './components/main-page/Main';
import Profile from './components/profile/Profile';
import AuthLayout from './components/auth-layout/Auth-Layout';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<MainPage></MainPage>} />
        <Route path="/" element={<DefaultLayout></DefaultLayout>}>
          <Route path='profile/:slug' element={<Profile></Profile>} />
        </Route> 
        <Route path="/" element={<AuthLayout></AuthLayout>}>
          <Route path='/register' element={<Register></Register>} />
          <Route path='/login' element={<Login></Login>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
