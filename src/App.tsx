import './App.css'
import {Route, Routes} from 'react-router-dom';
import DefaultLayout from './components/default/Default-Layout';
import Register from './components/register/Register';
import Login from './components/login/Login';
import MainPage from './components/main-page/Main';
import AnimationPage from "./components/animation/AnimationPage.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout/>}>
                    <Route index element={<MainPage></MainPage>}/>
                    <Route path='register' element={<Register></Register>}/>
                    <Route path='login' element={<Login></Login>}/>
                </Route>
                <Route path='/animation' element={<AnimationPage/>}/>
            </Routes>
        </>
    )
}

export default App
