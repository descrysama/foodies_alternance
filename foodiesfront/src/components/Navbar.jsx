import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineMenu, AiOutlineClose, AiOutlineLogout} from 'react-icons/ai'
import { useCookies } from "react-cookie";
import axios from 'axios'

const Navbar = () => {

  const [nav, setNav] = useState(false);
  const [auth, setAuth] = useState();
  const [token, setToken, removeToken] = useCookies(["jwt"]);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav)
  }

  const handleLogout = async() => {
    await axios({
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/logout`,
      withCredentials: true,
    }).then(() => navigate("/login"));
  }

  const myRequest = async () => {
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
    <header>
      <nav className='flex justify-end md:justify-around p-4 items-center h-24 text-white mx-auto max-w-[1240px]'>
        <h1 className='w-full text-3xl font-bold text-[#f08080]'>Foodies.</h1>
        <ul className='hidden md:flex'>
          <Link to="/" className='p-3 hover:text-[#f08080] hover:border-b border-[#f08080] cursor-pointer'>Accueil</Link>
          <Link to="/search" className='p-3 hover:text-[#f08080] hover:border-b border-[#f08080] cursor-pointer'>Rechercher</Link>
          {auth ? <Link to="/favorite" className='p-3 hover:text-[#f08080] hover:border-b border-[#f08080] cursor-pointer'>Favoris</Link> : null}
        </ul>
          {auth === false? 
          <div className='hidden md:flex m-4'>
            <Link to='/login' className='p-3 bg-[#f08080] rounded hover:bg-[#c94949] ease-in-out duration-300'>Connexion</Link>
          </div> 
          :
          <div onClick={handleLogout} className='hidden cursor-pointer md:flex p-3 m-2 bg-[#f08080] rounded hover:bg-[#c94949] ease-in-out duration-300'>
            Deconnexion <AiOutlineLogout size={25}/>
          </div>
          }
        <div onClick={handleNav} className="hover:cursor-pointer block md:hidden">
          {!nav ? <AiOutlineMenu size={25}/> : <AiOutlineClose size={25}/>}
        </div>
        <div className={nav ? "fixed left-0 top-0 w-[70%] border-r border-r-[#141f36] h-full bg-[#000814] ease-in-out duration-300 md:hidden" : 'fixed left-[-100%]'}>
          <h1 className='w-full text-3xl font-bold text-[#f08080] m-4'>AIRBNC.</h1>
          <ul className='uppercase flex flex-col justify-center items-left'>
            <Link to="/" className='p-3 m-2 hover:text-[#f08080] hover:border-b border-[#f08080] cursor-pointer'>Accueil</Link>
            <Link to="/search" className='p-3 m-2 hover:text-[#f08080] hover:border-b border-[#f08080] cursor-pointer'>Rechercher</Link>
            <Link to="/favorite" className='p-3 m-2 hover:text-[#f08080] hover:border-b border-[#f08080] cursor-pointer'>Favoris</Link>
            {auth === false? 
            <Link to='/login' className='p-3 m-2 bg-[#f08080] rounded hover:bg-[#c94949] ease-in-out duration-300'>Connexion</Link>
          :
          <div onClick={handleLogout} className=' m-2 flex cursor-pointer md:hidden p-3 bg-[#f08080] rounded hover:bg-[#c94949] ease-in-out duration-300'>
            Deconnexion <AiOutlineLogout size={25}/>
          </div>
          }
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar