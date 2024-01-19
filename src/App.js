import logo from './logo.svg';
import './App.css';
import Recipe from './components/Recipe/Recipe';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route exact path='/' element={<Home/>}> </Route>
          <Route exact path='/user/getUserById/:userId' element={<User/>}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
