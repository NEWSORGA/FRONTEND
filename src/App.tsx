import './App.css'
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/default/Default-Layout';
// import Register from './components/register/Register';
import Login from './components/login/Login';
import MainPage from './components/main-page/Main';
import Profile from './components/profile/Profile';
import AuthLayout from './components/auth-layout/Auth-Layout';
import { ThoughtDetails } from './components/thoughtDetails/ThoughtDetails';
import Settings from './components/settings/Settings';

function App() {
  return (
      <Routes>

        <Route path="/" element={<DefaultLayout></DefaultLayout>}>
          <Route index element={<MainPage></MainPage>} />
          <Route path='profile/:id' element={<Profile></Profile>} />
          <Route path='settings' element={<Settings></Settings>}/>
          <Route path='thought/:id' element={<ThoughtDetails />} />
        </Route>
        <Route path="/" element={<AuthLayout></AuthLayout>}>
          {/* <Route path='/register' element={<Register></Register>} /> */}
          <Route path='/login' element={<Login></Login>} />
        </Route>
      </Routes>
  )
}

export default App
