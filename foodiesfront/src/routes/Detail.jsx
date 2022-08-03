import * as foodServices from '../services/foodServices';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

export const Detail = () => {

    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
        foodServices.detailProduct(id).then(response => {
          setProduct(response.data.product)
          setLoading(false)
        })
    }, [id])

  return (
    <section className="text-gray-600 body-font overflow-hidden">
        {loading ?
            <div className="spinner"></div>
        :
        <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.image_url} />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.brands}</h2>
                    <h1 className="text-gray-300 text-3xl title-font font-medium mb-1">{product.generic_name_fr}</h1>
                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                        <ul style={{listStyleType: "none", textAlign: 'left'}}>
                            <li className='text-gray-300'>Calories : {product.nutriments['energy-kcal_100g'] ? product.nutriments['energy-kcal_100g'] : 'NaN'}cal/100g</li>
                            <li className='text-gray-300'>Nutri-score : {product.nutriments['nutrition-score-fr_100g'] ? product.nutriments['nutrition-score-fr_100g'] : 'NaN'}</li>
                        </ul>
                    </div>
                    <button onClick={() => navigate(-1)} className='flex p-3 bg-[#f08080] rounded hover:bg-[#c94949] ease-in-out duration-300 m-1 text-white items-center'>Retour à la liste produit</button>
                </div>
            </div>
        </div>}
    </section>
  )
}

export default Detail