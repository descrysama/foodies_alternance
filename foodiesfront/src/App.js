import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './routes/Home';
import Login from './routes/authRoutes/Login';
import Register from './routes/authRoutes/Register';
import Detail from './routes/Detail';
import Search from './routes/Search';
import Favorite from './routes/Favorite';
import ProtectedLogin from './middlewares/ProtectedLogin';
import ProtectedRoute from './middlewares/ProtectedRoutes'
import './index.css';
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";


function App() {

  const [auth, setAuth] = useState();
  const [token, setToken, removeToken] = useCookies(["jwt"]);
  
  const myRequest = async() => {
    if (token) {
      await axios({
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/checktoken`,
      }).then((response) => {
        setAuth(response.data.status)
      });
    }
  };

  useEffect(() => {
    myRequest();
  })


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home auth={auth}/>} />
        <Route path="/login" element={<ProtectedLogin><Login /></ProtectedLogin>} />
        <Route path="/register" element={<ProtectedLogin><Register /></ProtectedLogin>} />
        <Route path="/favorite" element={<ProtectedRoute><Favorite /></ProtectedRoute>} />
        <Route path="/search" element={<Search />} />
        <Route path='/detail/:id' element={<Detail/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
