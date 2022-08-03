import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as userService from '../../services/userServices';
import Swal from 'sweetalert2'

const Register = () => {

  const [name, setName] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password && repeatPassword && password === repeatPassword) {
       userService.Register(name, lastname, email, password).then(response => {
        if (response.data.status === true) {
          Swal.fire({
            icon: 'success',
            title: 'Success !',
            text: response.data.message
          })
        } else if (response.data.status === false) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur...',
            text: response.data.message
          })
        }
        if (response.data.error.code) {
          if (response.data.error.code === 11000) {
            Swal.fire({
              icon: 'error',
              title: 'Erreur...',
              text: 'Email déja utilisé veuillez vous connecter.'
            })
          }
        }
      })
      resetFields();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur...',
        text: 'Verifiez vos champs. Sont-ils tous remplis ?'
      })
    }
  }

  const resetFields = () => {
    setName('')
    setlastname('')
    setEmail('')
    setPassword('')
    setRepeatPassword('')
  }


  return (
    <div className='mx-auto max-w-[400px] h-[80vh] flex justify-center items-center flex-col md:flex-col text-center text-white p-2'>
        <Link to="/"><h1 className='w-full text-3xl md:text-6xl font-bold text-[#f08080] m-2 hover:text-[#c94949] ease-in-out duration-300'>Foodies.</h1></Link>
        <form onSubmit={(e) => handleSubmit(e)} className='text-left flex flex-col justify-center items-center w-full'>
            <div className='flex flex-col m-2 w-full'>
                <label htmlFor="nom">Nom :</label>
                <input className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' type="text" id="nom" placeholder='Doe' onChange={(e) => setlastname(e.target.value)} value={lastname}/>
            </div>
            <div className='flex flex-col m-2 w-full'>
                <label htmlFor="prenom">Prenom :</label>
                <input className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' type="text" id="prenom" placeholder='John' onChange={(e) => setName(e.target.value)} value={name}/>
            </div>
          <div className='flex flex-col m-2 w-full'>
            <label htmlFor="email">Email :</label>
            <input className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' type="email" id="email" placeholder='john.doe@gmail.com' onChange={(e) => setEmail(e.target.value)} value={email}/>
          </div>
          <div className='flex flex-col m-2 w-full'>
            <label htmlFor="password">Mot de passe :</label>
            <input className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' type="password" id="password" placeholder='********' onChange={(e) => setPassword(e.target.value)} value={password}/>
          </div>
          <div className='flex flex-col m-2 w-full'>
            <label htmlFor="repeatpassword">Répeter le mot de passe :</label>
            <input className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' type="password" id="repeatpassword" placeholder='********' onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword}/>
          </div>
          <Link to="/login" className='text-left w-full hover:text-[#f08080] cursor-pointer text-gray-400'>Deja inscrit connectez-vous !</Link>
          <input type="submit" value="S'inscrire" className='p-3 m-2 bg-[#f08080] rounded hover:bg-[#c94949] hover:cursor-pointer w-full  ease-in-out duration-300 '/>
        </form>
    </div>
  )
}

export default Register;