import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import svgHome from '../assets/images/svg/svgHome.svg'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

const Home = ({auth}) => {

  return (
    <>
      <Navbar />
      <section className='mx-auto max-w-[1240px] h-[90vh] flex justify-center items-center flex-col md:flex-row'>
        <div className='w-full md:w-[50%] text-center flex justify-center items-center flex-col text-white p-2'>
          <h1 className='w-full text-6xl md:text-8xl font-bold text-[#f08080] m-2'>Foodies.</h1>
          <p className='w-full m-2 text-xl md:text-lg'>Recherchez vos aliments préférés.</p>
          {auth === false ?
          <Link to='/register' className='p-3 m-2 bg-[#f08080] rounded hover:bg-[#c94949] ease-in-out duration-300 w-auto text-center'>Inscription</Link>
          :
          <Link to='/search' className='p-3 m-2 bg-[#f08080] rounded hover:bg-[#c94949] ease-in-out duration-300 w-auto text-center'>Recherchez le bonheur</Link>
          }
        </div>
        <div className='w-[50%] text-center justify-center items-center flex-col text-white hidden lg:block'>
          <img src={svgHome} alt="" />
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default Home