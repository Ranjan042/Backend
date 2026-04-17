import React, { useEffect } from 'react'
import { useAuth } from '../../Auth/Hook/UseAuth.jsx'
import { useProduct } from '../Hook/UseProduct.jsx';

const Home = () => {
    const {user,loading}=useAuth();
    const {allProducts,HandleGetAllProducts}=useProduct();


    useEffect(() => {
      HandleGetAllProducts();
    }, []);

    if(loading) return <h1>Loading....</h1>
  return (
    <div>
      I am Home
      {allProducts.map((product) => (
        <div key={product._id}>
          <img src={product.images[0]} alt={product.title} />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.priceAmount} {product.priceCurrency}</p>
        </div>
      ))}
    </div>
  )
}

export default Home
