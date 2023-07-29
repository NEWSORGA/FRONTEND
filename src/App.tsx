import './App.css'
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/default/Default-Layout';
import Register from './components/register/Register';
import Login from './components/login/Login';
import MainPage from './components/main-page/Main';
import AboutUs from './components/about/about';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<MainPage></MainPage>} />
        <Route path="/" element={<DefaultLayout />}>
          <Route path='register' element={<Register></Register>} />
          <Route path='login' element={<Login></Login>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
