import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {BsFillTrashFill} from 'react-icons/bs'
import Swal from 'sweetalert2'




const Favorite = () => {

  const [id, setId] = useState('');
  const [favorites, setFavorites] = useState([]);

  const removeFavorite = (productid) => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/removefavorite`,
      data: {
        userid: id,
        productid: productid
      }
    }).then(response => {
      if (response.data.status == true) {
        Swal.fire({
          icon: 'success',
          title: 'Success !',
          text: 'Votre favoris à bien été supprimé.'
        })
        let newFavorites = favorites.filter(product => productid != product.product_id)
        setFavorites(newFavorites)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error !',
          text: 'Votre favoris n\'a pas été supprimé, où il a déja été supprimé.'
        })
      }
    })
  }


  const CheckThenFetch = async() => {
    await axios({
      method: 'post',
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URL}/checktoken`,
    }).then(response => {
      setId(response.data.id);
    })
  }

  const fetchFavorites = async() => {
    await axios({
      method: 'get',
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URL}/getfavorites`,
    }).then(response => {
      setFavorites(response.data.favorites);
    });
  }



  useEffect(() => {
    CheckThenFetch()
    fetchFavorites()
  }, [])


  return (
    <>
      <Navbar />
        <section className='mx-auto max-w-[1400px] h-auto flex justify-center items-center p-4'>
        <section className='mx-auto max-w-[1400px] flex justify-center flex-col md:flex-row'>
          <div className="flex flex-col w-[70%] justify-center items-center">
            <div className=" sm:-mx-6 lg:-mx-8 mx-auto flex justify-center items-center">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 justify-center items-center">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="border-b text-white">
                      <tr>
                        <th scope="col" className="text-sm font-medium px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4">
                          Image
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4">
                          Code Produit
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4">
                          Marque
                        </th>
                        <th scope="col" className="text-sm font-bold px-6 py-4 cursor-pointer" >
                          Calories
                        </th>
                        <th scope="col" className="text-sm font-bold px-6 py-4 cursor-pointer" >
                          NutriScore
                        </th>
                      </tr>
                    </thead>
                    <tbody className="w-full text-center text-white">
                      {favorites.map((product, key) => (
                        <tr className="bg-[#000814] border-b" key={key}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{key+1}</td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          <img src={product.image_url} alt=""/>
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          {product.product_id}
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          {product.brand}
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          {product.calories ? product.calories : 'NaN'}cal
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          {product.nutriscore ? product.nutriscore : 'NaN'}
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          <button onClick={() => removeFavorite(product.product_id)} className="p-3 m-2 bg-[#f08080] rounded hover:bg-[#c94949] ease-in-out duration-300 w-auto text-center"><BsFillTrashFill size={18} /></button>
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        </section>
    </>
  )
}

export default Favorite