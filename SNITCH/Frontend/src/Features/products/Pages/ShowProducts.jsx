import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useProduct } from '../Hook/UseProduct';

const ShowProducts = () => {
    const { HandleGetProducts } = useProduct();
    const { products } = useSelector((state) => state.product);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        HandleGetProducts();
    }, []);
    const HandleClick=(e, key) => {
            e.preventDefault();
            navigate(`/seller/product/${key}`);
            console.log(key)
    }
    return (
        <div className="min-h-screen bg-white text-black font-inter pb-20">
            {/* Header section */}
            <div className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div>
                        <span className="text-gray-500 text-[10px] font-bold tracking-[0.25em] uppercase font-space mb-4 block">
                            Hello {user?.FullName || 'Seller'}
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-space font-bold tracking-tighter uppercase text-black">
                            Inventory
                        </h1>
                        <p className="mt-2 text-xs uppercase tracking-widest text-gray-500">
                            Manage Your Listed Products
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/seller/create-product')}
                        className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-black text-white font-space font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-gray-900 w-full sm:w-auto text-xs"
                    >
                        <span className="flex items-center gap-3">
                            <span className="text-lg leading-none mt-[1px]">+</span>
                            Add Product
                        </span>
                    </button>
                </div>
            </div>

            {/* Grid section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 w-full">
                    {products?.map((product) => (
                        <div
                            key={product._id}
                            className="group flex flex-col gap-4 cursor-pointer"
                        >
                            {/* Image Container */}
                            <div
                            onClick={(e)=> HandleClick(e,product._id)}
                            className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                <img
                                    src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=1400&auto=format&fit=crop'}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-col gap-1 mt-1">
                                <h2 className="text-[11px] font-bold font-inter text-black uppercase tracking-[0.15em] truncate">
                                    {product.title}
                                </h2>
                                <span className="text-[11px] font-bold font-inter text-red-400 uppercase tracking-[0.2em] block">
                                    {product.price.currency} {product.price.amount}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {products?.length === 0 && (
                    <div className="flex flex-col justify-center items-center h-64 border border-dashed border-gray-300 mt-8">
                        <p className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-bold mb-4">No products found</p>
                        <button
                            onClick={() => navigate('/seller/create-product')}
                            className="text-black font-bold uppercase tracking-[0.15em] text-[10px] hover:underline decoration-1 underline-offset-4"
                        >
                            Create Your First Listing
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowProducts;