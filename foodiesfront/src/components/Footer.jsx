import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {


  return (
    <footer className='w-full bg-[#000917] h-[120px] md:flex mt-[30vh]'>
        <div className='md:w-[50%] flex justify-center items-center text-center'>
            <h1 className='w-full text-3xl font-bold text-[#f08080]'>AIRBNC.</h1>
        </div>
        <div className='md:w-[50%] flex flex-col justify-center items-center text-white m-4'>
            <h3>+33483922014</h3>
            <h3>contact@airbnc.com</h3>
        </div>
    </footer>
  )
}

export default Footer