import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {AiOutlineSearch, AiFillHeart} from 'react-icons/ai'
import * as foodServices from '../services/foodServices';
import Swal from 'sweetalert2'

const Search = () => {


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [maxCount, setMaxCount] = useState(25);
    const [search, setSearch] = useState('');

    const [id, setId] = useState('');
    const [listFilterToggle, setlistFilterToggle] = useState(false);
  
    useEffect(() => {
        setLoading(true)
        foodServices.searchProducts(search, maxCount).then(response => {
        setData(response.data.products);
        setLoading(false)
        })

        CheckThenFetch()
        
    }, [maxCount])

    const CheckThenFetch = async() => {
      await axios({
        method: 'post',
        withCredentials: true,
        url: `${process.env.REACT_APP_API_URL}/checktoken`,
      }).then(response => {
        setId(response.data.id);
      })
    }

    const searchHandler = () => {
        setLoading(true)
        foodServices.searchProducts(search, maxCount).then(response => {
        setData(response.data.products);
        setLoading(false)
      })
    }

    const listFilter = (param) => {
      const oldData = [...data];
      if (listFilterToggle == false) {
        const newData = oldData.sort((a, b) => {
          return a.nutriments[param] > b.nutriments[param] ? +1 : -1
        });
        setData(newData)
        setlistFilterToggle(!listFilterToggle)
      } else {
        const newData = oldData.sort((a, b) => {
          return a.nutriments[param] > b.nutriments[param] ? -1 : +1
        });
        setData(newData)
        setlistFilterToggle(!listFilterToggle)
      }
    }

    const addFavorite = async(productid, image_url, calories, nutriscore, brand) => {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/addfavorite`,
        data : {
          userid: id,
          productid: productid,
          image_url: image_url,
          calories: calories,
          nutriscore: nutriscore,
          brand: brand
        }
      }).then(response => {
        if (response.data.status == true) {
          Swal.fire({
            icon: 'success',
            title: 'Success !',
            text: response.data.message
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error !',
            text: response.data.message
          })
        }
      })
    }

  return (
    <>
      <Navbar />
        <section className='mx-auto max-w-[1400px] h-auto flex justify-center items-center p-4'>
            <div className='w-1/2 h-[20%] md:flex md:justify-center md:items-center text-white p-2'>
                <input className="shadow appearance-none border border-red-500 rounded md:w-5/6 py-2 w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1" type="text" name="search" id="" placeholder='Recherchez vos aliments par mots clés' onChange={(e)=> setSearch(e.target.value)} value={search}/>
                <button to='/login' className='p-3 bg-[#f08080] rounded hover:bg-[#c94949] ease-in-out duration-300 m-1 flex items-center' onClick={() => searchHandler()}><AiOutlineSearch size={18} />Rechercher</button>
            </div>
        </section>
            <div className='flex w-full justify-center items-center'>
              <button className={maxCount ==  25 ? 'p-3 bg-[#ec4c4c] rounded hover:bg-[#c94949] ease-in-out duration-300 m-1 flex items-center' : 'p-3 bg-[#f08080] rounded hover:bg-[#c94949] ease-in-out duration-300 m-1 flex items-center'} onClick={(e) => setMaxCount(e.target.value)} value="25">25</button>
              <button className={maxCount ==  50 ? 'p-3 bg-[#ec4c4c] rounded hover:bg-[#c94949] ease-in-out duration-300 m-1 flex items-center' : 'p-3 bg-[#f08080] rounded hover:bg-[#c94949] ease-in-out duration-300 m-1 flex items-center'} onClick={(e) => setMaxCount(e.target.value)} value="50">50</button>
              <button className={maxCount ==  100 ? 'p-3 bg-[#ec4c4c] rounded hover:bg-[#c94949] ease-in-out duration-300 m-1 flex items-center' : 'p-3 bg-[#f08080] rounded hover:bg-[#c94949] ease-in-out duration-300 m-1 flex items-center'} onClick={(e) => setMaxCount(e.target.value)} value="100">100</button>
              <input className='shadow appearance-none border border-red-500 rounded w-[10%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1' type="text" onChange={(e) => setMaxCount(e.target.value)} value={maxCount}/>
            </div>
        <section className='mx-auto max-w-[1400px] flex justify-center flex-col md:flex-row'>
          <div className="flex flex-col w-[70%] justify-center items-center">
            <div className=" sm:-mx-6 lg:-mx-8 mx-auto flex justify-center items-center">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 justify-center items-center">
                <div className="overflow-hidden">
                  {loading ?
                  <div className="spinner"></div>
                  :
                  <table className="min-w-full">
                    <thead className="border-b text-white">
                      <tr>
                        <th scope="col" className="text-sm font-medium px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4">
                          Favoris
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
                        <th scope="col" className="text-sm font-bold px-6 py-4 cursor-pointer" onClick={() => listFilter("energy-kcal_100g")}>
                          Calories
                        </th>
                        <th scope="col" className="text-sm font-bold px-6 py-4 cursor-pointer" onClick={() => listFilter("nutrition-score-fr_100g")}>
                          NutriScore
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4">
                          Détail
                        </th>
                      </tr>
                    </thead>
                    <tbody className="w-full text-center text-white">
                      {data.map((product, key) => (
                      <tr className="bg-[#000814] border-b hover:bg-[#000e24]" key={key}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{key+1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button onClick={() => addFavorite(product._id, product.image_front_thumb_url, product.nutriments['energy-kcal_100g'], product.nutriments['nutrition-score-fr_100g'], product.brands)} className="p-3 m-2 bg-[#f08080] rounded hover:bg-[#c94949] ease-in-out duration-300 w-auto text-center"><AiFillHeart size={18} /></button>
                        </td>
                        <td className="text-sm flex justify-center items-center font-light m-3 whitespace-nowrap h-[100%]">
                          <img src={product.image_front_thumb_url} alt=""/>
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                          {product._id}
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                          {product.brands}
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                          {product.nutriments['energy-kcal_100g'] ? product.nutriments['energy-kcal_100g'] : 'NaN'}cal
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                          {product.nutriments['nutrition-score-fr_100g'] ? product.nutriments['nutrition-score-fr_100g'] : 'NaN'}
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                          <Link className="p-3 m-2 bg-[#f08080] rounded hover:bg-[#c94949] ease-in-out duration-300 w-auto text-center" to={`/detail/${product._id}`}>Détail</Link>
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>}
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default Search