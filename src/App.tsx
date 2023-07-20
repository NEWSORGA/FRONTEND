import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/default/Default-Layout'; 
import Register from './components/register/Register';

function App() { 
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}/> 
        <Route path='register' element={<Register></Register>}/>
      </Routes>
    </>
  )
}

export default App
