import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Auth/Hook/UseAuth.jsx';
import { useProduct } from '../Hook/UseProduct.jsx';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';
import { UseCart } from '../../Cart/Hook/UseCart.jsx';

const Home = () => {
    const { user, loading: authLoading } = useAuth();
    const { HandleGetCart } = UseCart();
    const { allProducts, HandleGetAllProducts, loading: productsLoading } = useProduct();
    const navigate = useNavigate();
    const [mounted, setMounted] = useState(false);
    const cart = useSelector((state) => state.cart.cart);
    const cartItemsCount = cart?.cartItems?.length || 0;

    useEffect(() => {
        setMounted(true);
        HandleGetAllProducts();
        if (user) {
            HandleGetCart();
        }
    }, [user]);

    if (authLoading || (productsLoading && !allProducts)) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <span className="text-black font-space tracking-[0.3em] uppercase text-xs animate-pulse">Loading...</span>
            </div>
        );
    }

    const HandleClick=(e, key) => {
        e.preventDefault();
        navigate(`/product/${key}`);
        // console.log(key)
    }

    return (
        <div className="min-h-screen bg-white text-black font-inter overflow-hidden relative">

            {/* Navigation / Header */}
            <div className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
                    <span 
                        onClick={() => navigate('/')} 
                        className="text-black text-2xl font-bold tracking-tighter uppercase font-space cursor-pointer"
                    >
                        Snitch
                    </span>
                    <div className="flex gap-6 items-center text-[10px] font-bold uppercase tracking-widest font-inter">
                        {user ? (
                            <>
                                <span className="text-gray-400 hidden sm:block">Hello, {user.FullName?.split(' ')[0] || 'User'}</span>
                                {user.Role === 'seller' ? (
                                    <button onClick={() => navigate('/seller/products')} className="text-black hover:underline decoration-2 underline-offset-4 transition-all uppercase">Dashboard</button>
                                ) : (
                                    <button onClick={() => {}} className="text-black hover:underline decoration-2 underline-offset-4 transition-all uppercase">Profile</button>
                                )}
                                <div 
                                    onClick={() => navigate('/cart')}
                                    className="relative cursor-pointer group p-2"
                                >
                                    <FiShoppingCart className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                                    {cartItemsCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                                            {cartItemsCount}
                                        </span>
                                    )}
                                </div>
                            </>
                        ) : (
                            <button onClick={() => navigate('/login')} className="text-black hover:underline decoration-2 underline-offset-4 transition-all uppercase">Log In</button>
                        )}
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className={`max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-16 transition-all duration-1000 ease-out transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="flex flex-col gap-4">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-500 font-inter">
                        Latest Collection
                    </span>
                    <h1 className="text-5xl md:text-7xl font-space font-bold tracking-tighter uppercase text-black max-w-2xl leading-[0.9]">
                        Minimalism <br /> Redefined.
                    </h1>
                </div>
            </div>

            {/* Product Grid */}
            <div className={`max-w-7xl mx-auto px-6 lg:px-12 pb-24 transition-all duration-1000 delay-300 ease-out transform z-10 relative ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                    {allProducts?.map((product) => (
                        <div 
                            // onClick={() => navigate(`/product/${product._id}`)}
                           
                            key={product._id} 
                            className="group flex flex-col cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4"
                               onClick={(e)=> HandleClick(e,product._id)}
                            >
                                <img
                                    src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=1400&auto=format&fit=crop'}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                                {/* subtle overlay on hover */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            {/* Product Details */}
                            <div className="flex flex-col gap-1.5 px-1">
                                <h2 className="text-[11px] font-bold font-inter text-black uppercase tracking-[0.15em] truncate">
                                    {product.title}
                                </h2>
                                <span className="text-[11px] font-bold font-inter text-gray-400 uppercase tracking-[0.2em]">
                                    {product.price?.currency || 'INR'} {product.price?.amount || 0}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {(!allProducts || allProducts.length === 0) && !productsLoading && (
                    <div className="flex flex-col justify-center items-center h-64 border border-dashed border-gray-300 mt-8">
                        <p className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-bold">No pieces in the collection</p>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default Home;
