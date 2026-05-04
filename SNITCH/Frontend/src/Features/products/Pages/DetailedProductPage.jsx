import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { useProduct } from '../Hook/UseProduct';
import { useSelector } from 'react-redux';
import { UseCart } from '../../Cart/Hook/UseCart';
import { FiShoppingCart } from 'react-icons/fi';


const DetailedProductPage = () => {
    const { HandleGetSelectedProduct,selectedProduct, loading } = useProduct();
    const { HandleGetCart,HandleAddToCart } = UseCart();


    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.auth.user);
    const cart = useSelector((state) => state.cart.cart);
    const cartItemsCount = cart?.cartItems?.length || 0;
     const [mainImage, setMainImage] = useState('/');
    const [mounted, setMounted] = useState(false);
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [activeVariant, setActiveVariant] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        setMounted(true);
        if (id) {
            HandleGetSelectedProduct(id);
        }
        if (user) {
            HandleGetCart();
        }
    }, [id, user]);

    // Extract available attributes from variants
    const availableAttributes = React.useMemo(() => {

        if (!selectedProduct?.variant) return {};
        // // console.log("selectedProduct.variant", selectedProduct.variant);
        const attrs = {};
        selectedProduct.variant.forEach(v => {
            // // console.log("variants",v.attributes);
            if (v.attributes) {
                Object.entries(v.attributes).forEach(([key, value]) => {
                    const normalizedKey = key.trim().toLowerCase();
                    // // console.log("NormalizedKey",normalizedKey)
                    if (!attrs[normalizedKey]) {
                        // // console.log("DisplayKey",key.trim())
                        // // console.log("values",new Set())
                        // // console.log("value",value)
                        attrs[normalizedKey] = {
                            displayKey: key.trim(),
                            values: new Set()
                        };
                    }
                    attrs[normalizedKey].values.add(value);
                    // // console.log("attrs[normalizedKey]", attrs[normalizedKey]);
                });
            }
        });
        // Convert sets to sorted arrays
        const result = {};
        Object.keys(attrs).forEach(normalizedKey => {
            result[normalizedKey] = {
                displayKey: attrs[normalizedKey].displayKey,
                values: Array.from(attrs[normalizedKey].values).sort()
            };
        });
        return result;
    }, [selectedProduct])

    

    // Update active variant when selections change
    useEffect(() => {
        if (selectedProduct?.variant) {
            const match = selectedProduct.variant.find(v => {
                if (!v.attributes) return false;
                
                // Normalize variant attribute keys
                const vAttrs = {};
                Object.entries(v.attributes).forEach(([k, v]) => {
                    vAttrs[k.trim().toLowerCase()] = v;
                });
               
                return Object.entries(selectedAttributes).every(([key, value]) => vAttrs[key] === value) &&
                    Object.keys(vAttrs).length === Object.keys(selectedAttributes).length;
            });
            setActiveVariant(match || null);
            if (match?.images?.length > 0) {
                setMainImage(match.images[0].url);
            }
        }
    }, [selectedAttributes, selectedProduct]);

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
        // Initialize first variant if exists and unique
        if (selectedProduct?.variant?.length === 1 && selectedProduct.variant[0].attributes) {
            setSelectedAttributes(selectedProduct.variant[0].attributes);
        }
    }, [selectedProduct]);
    
    useEffect(() => {
        if (!selectedProduct?.variant || Object.keys(selectedAttributes).length === 0) return;
        
        const newSelected = { ...selectedAttributes };
        let changed = false;

        Object.entries(selectedAttributes).forEach(([key, value]) => {
            if (!isAttributeValueAvailable(key, value)) {
                delete newSelected[key];
                changed = true;
            }
        });

        if (changed) {
            setSelectedAttributes(newSelected);
        }
    }, [selectedAttributes, selectedProduct]);
    
    if (loading || !selectedProduct) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <span className="text-black font-space tracking-[0.3em] uppercase text-[10px] animate-pulse">Loading...</span>
            </div>
        );
    }

    const isAttributeValueAvailable = (attrKey, value) => {
        if (!selectedProduct?.variant) return false;
        
        return selectedProduct.variant.some(v => {
            if (!v.attributes) return false;
            
            const vAttrs = {};
            Object.entries(v.attributes).forEach(([k, val]) => {
                vAttrs[k.trim().toLowerCase()] = val;
            });
            
            // Check if this variant matches ALL OTHER currently selected attributes
            const matchesOthers = Object.entries(selectedAttributes).every(([sKey, sVal]) => {
                if (sKey === attrKey) return true;
                return vAttrs[sKey] === sVal;
            });
            
            return matchesOthers && vAttrs[attrKey] === value && v.stock > 0;
        });
    };

    // Automatically clear selections that become invalid/out-of-stock when other attributes change

    const toggleAttribute = (key, value) => {
        setSelectedAttributes(prev => {
            if (prev[key] === value) {
                const newState = { ...prev };
                delete newState[key];
                return newState;
            }
            return { ...prev, [key]: value };
        });
    };
    const handleAddToCart = async () => {
        if (!user) {
            navigate("/login", {
                state: {
                    from: location,
                    action: "addtocart",
                    productid: selectedProduct._id,
                    varientid: activeVariant?._id,
                }
            });
        } else {
            // If variants exist, ensure one is selected
            if (selectedProduct.variant?.length > 0 && !activeVariant) {
                alert("Please select a variant first");
                return;
            }
            await HandleAddToCart(selectedProduct._id, activeVariant?._id);
            navigate("/cart");
        }
    }

    const handleBuyNow = () => {
        if (!user) {
            navigate("/login", {
                state: {
                    from: location,
                    action: "buynow",
                }
            });
        } else {
            if (selectedProduct.variant?.length > 0 && !activeVariant) {
                alert("Please select a variant first");
                return;
            }
            navigate("/checkout");
        }
    }


    return (
        <div className="min-h-screen bg-white text-black font-inter overflow-hidden relative">
            {/* Header */}
            <div className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
                    <span
                        onClick={() => navigate('/')}
                        className="text-black text-2xl font-bold tracking-tighter uppercase font-space cursor-pointer"
                    >
                        Snitch
                    </span>
                    <div className="flex gap-6 items-center">
                        {user && (
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
                        )}
                        <button
                            onClick={() => navigate(-1)}
                            className="text-black text-[10px] uppercase font-bold tracking-widest hover:underline decoration-2 underline-offset-4"
                        >
                            ← Back
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20 transition-all duration-1000 ease-out transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* LEFT COLUMN - Media Gallery */}
                    <div className="flex flex-row gap-4">
                        {/* Thumbnails Column */}
                        {((activeVariant?.images?.length > 1) || (selectedProduct.images?.length > 1)) && (
                            <div className="flex flex-col gap-3 w-16 sm:w-20 shrink-0">
                                {(activeVariant?.images || selectedProduct.images).map((img, idx) => (
                                    <div
                                        key={img._id || idx}
                                        onClick={() => setMainImage(img.url)}
                                        className={`aspect-[4/5] cursor-pointer overflow-hidden transition-all duration-300 ${mainImage === img.url ? 'ring-1 ring-black ring-offset-2 opacity-100' : 'opacity-50 hover:opacity-100'}`}
                                    >
                                        <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Main Image View */}
                        <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden group flex-1">
                            <img
                                src={mainImage}
                                alt={selectedProduct.title}
                                className="w-full h-full object-cover object-center transition-transform duration-[2s] group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Product Info */}
                    <div className="flex flex-col lg:sticky lg:top-12">

                        <div className="mb-6 lg:mb-8">
                            <h1 className="text-3xl md:text-5xl font-space font-bold tracking-tighter uppercase text-black mb-4">
                                {selectedProduct.title}
                            </h1>
                            <div className="flex items-center justify-between">
                                <span className="text-sm md:text-base font-bold font-inter text-gray-500 uppercase tracking-[0.2em] block">
                                    {activeVariant?.price?.currency || selectedProduct.price?.currency || 'INR'} {activeVariant?.price?.amount || selectedProduct.price?.amount || 0}
                                </span>
                                {activeVariant && (
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${activeVariant.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {activeVariant.stock > 0 ? `In Stock (${activeVariant.stock})` : 'Out of Stock'}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="mb-8 lg:mb-10 w-full h-[1px] bg-gray-200"></div>

                        {/* Variant Selection */}
                        {Object.keys(availableAttributes).length > 0 && (
                            <div className="mb-10 space-y-8">
                                {Object.entries(availableAttributes).map(([normalizedKey, attr]) => (
                                    <div key={normalizedKey}>
                                        <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-4">
                                            Select {attr.displayKey}
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {attr.values.map(val => {
                                                const isSelected = selectedAttributes[normalizedKey] === val;
                                                const isAvailable = isAttributeValueAvailable(normalizedKey, val);
                                                
                                                return (
                                                    <button
                                                        key={val}
                                                        onClick={() => isAvailable && toggleAttribute(normalizedKey, val)}
                                                        disabled={!isAvailable}
                                                        className={`relative px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 group
                                                            ${isSelected 
                                                                ? 'bg-black text-white border-black z-10' 
                                                                : isAvailable 
                                                                    ? 'bg-white text-black border-gray-200 hover:border-black' 
                                                                    : 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed opacity-60'
                                                            }`}
                                                    >
                                                        <span className={!isAvailable ? 'opacity-40' : ''}>{val}</span>
                                                        
                                                        {/* Cross Lines for Unavailable Options (X) */}
                                                        {!isAvailable && (
                                                            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                                                                <div className="absolute w-[140%] h-[0.5px] bg-gray-300 -rotate-45 transform origin-center"></div>
                                                                <div className="absolute w-[140%] h-[0.5px] bg-gray-300 rotate-45 transform origin-center"></div>
                                                            </div>
                                                        )}
                                                        
                                                        {/* Tooltip for Sold Out */}
                                                        {!isAvailable && (
                                                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                                                NOT AVAILABLE
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Description Section */}
                        <div className="mb-12">
                            <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-4">
                                Product Details
                            </h3>
                            <p className="text-sm text-gray-800 leading-relaxed font-inter">
                                {selectedProduct.description}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={selectedProduct.variant?.length > 0 && (!activeVariant || activeVariant.stock <= 0)}
                                className={`w-full py-4 px-8 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 cursor-pointer border-none ${activeVariant?.stock <= 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'}`}
                            >
                                {activeVariant?.stock <= 0 ? 'Sold Out' : 'Add To Cart'}
                            </button>
                            <button
                                onClick={handleBuyNow}
                                disabled={selectedProduct.variant?.length > 0 && (!activeVariant || activeVariant.stock <= 0)}
                                className={`w-full py-4 px-8 bg-white border text-[11px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 cursor-pointer ${activeVariant?.stock <= 0 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-black text-black hover:bg-gray-50'}`}
                            >
                                Buy It Now
                            </button>
                        </div>

                        {/* Auxiliary Information */}
                        <ul className="mt-12 flex flex-col gap-3 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                            <li className="flex items-center gap-3">
                                <span className="w-1 h-1 bg-black rounded-full"></span>
                                Premium Minimalist Construction
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1 h-1 bg-black rounded-full"></span>
                                Complimentary Carbon-Neutral Shipping
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1 h-1 bg-black rounded-full"></span>
                                Guaranteed 14-Day Returns
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DetailedProductPage;