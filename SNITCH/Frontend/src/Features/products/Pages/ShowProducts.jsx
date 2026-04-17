import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useProduct } from '../Hook/UseProduct';

const ShowProducts = () => {
    const { HandleGetProducts } = useProduct();
    const { products } = useSelector((state) => state.product);
    const navigate = useNavigate();

    useEffect(() => {
        HandleGetProducts();
    }, []);

    return (
        <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-['Inter',sans-serif] p-8">
            {/* Header section */}
            <div className="max-w-7xl mx-auto mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-5xl font-['Space_Grotesk',sans-serif] tracking-tighter text-[#D4AF37] uppercase mb-2">
                        My Inventory
                    </h1>
                    <p className="text-sm tracking-widest uppercase text-[#99907c]">
                        Your Listed Products
                    </p>
                </div>
                <button
                    onClick={() => navigate('/seller/create-product')}
                    className="group relative inline-flex items-center justify-center px-8 py-3 bg-[#D4AF37] text-[#131313] font-['Space_Grotesk',sans-serif] font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-[#e6c148] w-full sm:w-auto shadow-lg"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Product
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                </button>
            </div>

            {/* Grid section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {products?.map((product) => (
                    <div
                        key={product._id}
                        className="group relative bg-[#1c1b1b] p-4 rounded-2xl transition-all duration-500 hover:bg-[#201f1f] hover:-translate-y-2 border border-transparent hover:border-[#D4AF37]/20 shadow-lg"
                    >
                        {/* Image Container with Overlay */}
                        <div className="relative aspect-square overflow-hidden rounded-xl bg-[#0e0e0e] mb-4">
                            <img
                                src={product.images?.[0]?.url || 'https://via.placeholder.com/400'}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-60"></div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col gap-2 px-1">
                            <h2 className="text-lg font-['Space_Grotesk',sans-serif] text-[#e5e2e1] uppercase tracking-wide truncate">
                                {product.title}
                            </h2>
                            <p className="text-xs text-[#99907c] line-clamp-2 min-h-[32px]">
                                {product.description}
                            </p>

                            <div className="flex justify-start items-end mt-2">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-[#99907c] uppercase tracking-wider mb-1">
                                        Price
                                    </span>
                                    <span className="text-base font-['Space_Grotesk',sans-serif] text-[#F2CA50]">
                                        {product.price.currency} {product.price.amount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {products?.length === 0 && (
                <div className="flex justify-center items-center h-64">
                    <p className="text-[#99907c] uppercase tracking-widest text-sm">No products available at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default ShowProducts;