import logo from './logo.svg';
import './App.css';
import Recipe from './components/Recipe/Recipe';
import { BrowserRouter, Routes, Route, Navigate, redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Authentication from './components/Authentication/Authentication';
import { useNavigate } from 'react-router-dom';



function App() {


  const currentUserExists = localStorage.getItem("currentUser") !== null && localStorage.getItem("currentUser") !== undefined;

  // if(!currentUserExists){
  //   navigate("/auth", {replace:true});
  //   return(
  //     <BrowserRouter>
  //     <Routes>
  //       <Route exact path="/auth"
  //          element={localStorage.getItem("currentUser") !== null && localStorage.getItem("currentUser") !== undefined ?  <Navigate to="/" />: <Authentication/>}>
  //        </Route>
  //     </Routes>
  //     </BrowserRouter>
  //   )
  // }
  // return (
  //   <div className='App'>
  //     <BrowserRouter>
  //       <Navbar></Navbar>
  //       <Routes>
          
  //         <Route exact path='/' element={<Home/>}> </Route>
  //         <Route exact path='/user/getUserById/:userId' element={<User/>}> </Route>
             
        
     
  //       </Routes>
  //     </BrowserRouter>
  //   </div>
  // );

  return <div className='App'>
    <BrowserRouter>
    <Navbar currentUserExists={currentUserExists}></Navbar>
      <Routes>
        {/* Redirect to /auth if there is no user */}
        <Route
          path="/*"
          element={!currentUserExists ? <Navigate to="/auth" replace /> : null}
        />

        {/* Routes accessible only if there is a user */}
        {currentUserExists && (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/user/getUserById/:userId' element={<User />} />
          </>
        )}

        {/* Authentication route */}
        <Route path='/auth' element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  </div>
}

export default App;
