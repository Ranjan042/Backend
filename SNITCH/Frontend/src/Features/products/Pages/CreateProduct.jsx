import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useProduct } from '../Hook/UseProduct';
import { useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';
import { UseCart } from '../../Cart/Hook/UseCart.jsx';

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];
const MAX_IMAGES = 7;
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const CreateProduct = () => {
    const { HandleCreateProduct } = useProduct();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const cart = useSelector((state) => state.cart.cart);
    const cartItemsCount = cart?.cartItems?.length || 0;
    const { HandleGetCart } = UseCart();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
    });
    
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            HandleGetCart();
        }
    }, [user]);

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [mounted, setMounted] = useState(false);
    
    const fileInputRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'title':
                if (!value.trim()) error = 'Title is required';
                else if (value.trim().length < 3) error = 'Title must be at least 3 characters';
                break;
            case 'description':
                if (!value.trim()) error = 'Description is required';
                else if (value.trim().length < 10) error = 'Description must be at least 10 characters';
                break;
            case 'priceAmount':
                if (!value) error = 'Price is required';
                else if (isNaN(value) || Number(value) <= 0) error = 'Price must be a positive number';
                break;
            default:
                break;
        }
        return error;
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        
        if (images.length === 0) {
            newErrors.images = 'At least one image is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const addFiles = (files) => {
        let newErrors = { ...errors };
        newErrors.images = null;

        const remaining = MAX_IMAGES - images.length;
        if (remaining <= 0) {
            newErrors.images = `Maximum ${MAX_IMAGES} images allowed`;
            setErrors(newErrors);
            return;
        }

        const validFiles = [];
        Array.from(files).slice(0, remaining).forEach(file => {
            if (!file.type.startsWith('image/')) {
                newErrors.images = 'Please upload only image files';
                return;
            }
            if (file.size > MAX_SIZE_BYTES) {
                newErrors.images = `Image ${file.name} exceeds ${MAX_SIZE_MB}MB`;
                return;
            }
            validFiles.push({ file, preview: URL.createObjectURL(file) });
        });

        if (validFiles.length > 0) {
            setImages(prev => [...prev, ...validFiles]);
        }
        
        if (newErrors.images || validFiles.length === 0) {
           setErrors(newErrors);
        } else {
           setErrors(prev => ({ ...prev, images: null }));
        }
    };

    const handleFileChange = (e) => {
        addFiles(e.target.files);
        e.target.value = '';
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length) {
            addFiles(e.dataTransfer.files);
        }
    }, [images, errors]);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const removeImage = (index) => {
        setImages(prev => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[index].preview);
            updated.splice(index, 1);
            return updated;
        });
        if (images.length - 1 === 0) {
            setErrors(prev => ({ ...prev, images: 'At least one image is required' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const allTouched = Object.keys(formData).reduce((acc, key) => ({...acc, [key]: true}), {});
        setTouched(allTouched);

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('priceAmount', formData.priceAmount);
            data.append('priceCurrency', formData.priceCurrency);
            images.forEach(img => data.append('images', img.file));
            
            await HandleCreateProduct(data);
            await new Promise(r => setTimeout(r, 1500)); // Simulating
            
            navigate('/');
        } catch (err) {
            console.error('Failed to create product', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getInputClass = (fieldName) => `
        w-full bg-transparent text-black border-b border-gray-300 outline-none py-3 text-sm 
        transition-all duration-300 placeholder:text-gray-400 font-inter rounded-none
        ${errors[fieldName] 
            ? 'border-red-500 focus:border-red-500' 
            : 'focus:border-black'}
    `;

    return (
        <div className="min-h-screen bg-white text-black font-inter overflow-hidden relative">
            <div className={`max-w-6xl mx-auto px-6 lg:px-12 transition-all duration-1000 ease-out transform relative z-10 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

                {/* Nav Brand & Header */}
                <div className="pt-8 pb-2 flex justify-between items-end border-b border-gray-200 pb-6 mb-10">
                    <div className="flex flex-col">
                        <span className="text-black text-xs font-bold tracking-[0.25em] uppercase font-space mb-4 block">
                            Snitch.
                        </span>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="text-gray-400 hover:text-black transition-all duration-300 text-xl leading-none"
                                aria-label="Go back"
                            >
                                ←
                            </button>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase text-black font-space">
                                New Listing
                            </h1>
                        </div>
                    </div>
                    {user && (
                        <div 
                            onClick={() => navigate('/cart')}
                            className="relative cursor-pointer group p-2 mb-1"
                        >
                            <FiShoppingCart className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                                    {cartItemsCount}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="pb-20 relative">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 lg:items-start">

                        {/* ── LEFT COLUMN — text fields ── */}
                        <div className="flex flex-col gap-8">

                            {/* Product Title */}
                            <div className="flex flex-col gap-2 group">
                                <label
                                    htmlFor="title"
                                    className={`text-[10px] uppercase font-bold tracking-[0.15em] transition-colors duration-300 font-inter ${errors.title ? 'text-red-500' : 'text-gray-500 group-focus-within:text-black'}`}
                                >
                                    Product Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="e.g. Oversized Linen Shirt"
                                    className={getInputClass('title')}
                                />
                                {errors.title && <span className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.title}</span>}
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-2 group">
                                <label
                                    htmlFor="description"
                                    className={`text-[10px] uppercase font-bold tracking-[0.15em] transition-colors duration-300 font-inter ${errors.description ? 'text-red-500' : 'text-gray-500 group-focus-within:text-black'}`}
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    rows={5}
                                    placeholder="Describe the product — material, fit, details..."
                                    className={`${getInputClass('description')} resize-none leading-relaxed`}
                                />
                                {errors.description && <span className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.description}</span>}
                            </div>

                            {/* Price — Amount + Currency */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-gray-500 font-inter">
                                    Pricing
                                </label>
                                <div className="flex gap-4 items-start">
                                    {/* Amount */}
                                    <div className="flex flex-col gap-1 flex-[2] group relative">
                                        <span className={`text-[9px] uppercase font-bold tracking-[0.15em] transition-colors ${errors.priceAmount ? 'text-red-500' : 'text-gray-400 group-focus-within:text-black'} font-inter`}>Amount</span>
                                        <input
                                            id="priceAmount"
                                            type="number"
                                            name="priceAmount"
                                            value={formData.priceAmount}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            min="0"
                                            step="0.01"
                                            placeholder="0.00"
                                            className={getInputClass('priceAmount')}
                                        />
                                        {errors.priceAmount && <span className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.priceAmount}</span>}
                                    </div>
                                    {/* Currency */}
                                    <div className="flex flex-col gap-1 flex-[1] group">
                                        <span className="text-[9px] uppercase font-bold tracking-[0.15em] text-gray-400 group-focus-within:text-black transition-colors font-inter">Currency</span>
                                        <select
                                            id="priceCurrency"
                                            name="priceCurrency"
                                            value={formData.priceCurrency}
                                            onChange={handleChange}
                                            className="bg-transparent text-black border-b border-gray-300 focus:border-black outline-none py-3 text-sm transition-all duration-300 font-inter w-full cursor-pointer rounded-none"
                                        >
                                            {CURRENCIES.map(c => (
                                                <option key={c} value={c} className="bg-white text-black">{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* ── RIGHT COLUMN — images ── */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between mt-2">
                                <label className={`text-[10px] uppercase font-bold tracking-[0.15em] transition-colors font-inter ${errors.images ? 'text-red-500' : 'text-gray-500'}`}>
                                    Media Gallery
                                </label>
                                <span className={`text-[10px] font-inter font-bold tracking-widest transition-colors ${images.length === MAX_IMAGES ? 'text-black' : 'text-gray-400'}`}>
                                    {images.length} / {MAX_IMAGES}
                                </span>
                            </div>

                            {/* Drop Zone */}
                            {images.length < MAX_IMAGES && (
                                <div
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`
                                    relative overflow-hidden group
                                    border border-dashed rounded-none px-6 py-12 lg:py-20 flex flex-col items-center gap-4 cursor-pointer transition-all duration-300 ease-out
                                    ${errors.images ? 'border-red-500 bg-red-50 hover:border-red-600' : 
                                      isDragging
                                        ? 'border-black bg-gray-50'
                                        : 'border-gray-300 hover:border-black hover:bg-gray-50'
                                    }
                                `}
                                >
                                    <div className={`transform transition-transform duration-500 ${isDragging ? '-translate-y-2' : 'group-hover:-translate-y-2'}`}>
                                        <span className={`text-3xl transition-colors duration-300 ${isDragging ? 'text-black' : 'text-gray-400 group-hover:text-black'}`}>
                                            +
                                        </span>
                                    </div>
                                    <div className="text-center w-full">
                                        <p className="text-xs text-gray-500 uppercase tracking-widest leading-relaxed font-inter">
                                            Drop high-res images here or{' '}
                                            <span className="text-black font-bold group-hover:underline transition-colors duration-300">browse</span>
                                        </p>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-inter mt-3 group-hover:text-gray-500 transition-colors">
                                            Max {MAX_IMAGES} items · Up to {MAX_SIZE_MB}MB each
                                        </p>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </div>
                            )}

                            {errors.images && <span className="text-red-500 text-xs animate-fadeIn">{errors.images}</span>}

                            {/* Image Previews */}
                            {images.length > 0 && (
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                                    {images.map((img, index) => (
                                        <div
                                            key={img.preview}
                                            className="relative aspect-[3/4] bg-gray-100 group transition-all duration-300 transform animate-fadeInScale"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <img
                                                src={img.preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                                            />
                                            
                                            {/* Remove Button */}
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute inset-0 m-auto w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-white bg-black hover:bg-red-500 shadow-xl border-none cursor-pointer"
                                                aria-label={`Remove image ${index + 1}`}
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                    </div>

                    {/* Submit Component */}
                    <div className="mt-16 lg:mt-20 border-t border-gray-200 pt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`
                                group relative min-w-[240px] bg-black text-white font-space font-bold tracking-[0.2em] py-4 px-10 
                                transition-colors duration-300 text-xs uppercase cursor-pointer
                                disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 border-none
                            `}
                        >
                            <span className="relative flex items-center justify-center gap-3">
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Publishing...
                                    </>
                                ) : (
                                    <>
                                        Publish Listing
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-3px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInScale {
                    animation: fadeInScale 0.4s ease-out forwards;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}} />
        </div>
    );
};

export default CreateProduct;