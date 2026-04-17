import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useProduct } from '../Hook/UseProduct'; // Assuming this exists

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];
const MAX_IMAGES = 7;
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const CreateProduct = () => {
    const { HandleCreateProduct } = useProduct();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
    });
    
    const [images, setImages] = useState([]); // [{ file, preview }]
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        
        // Mark all as touched
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
            await new Promise(r => setTimeout(r, 1500)); // Simulating api
            
            navigate('/');
        } catch (err) {
            console.error('Failed to create product', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getInputClass = (fieldName) => `
        w-full bg-[#1c1b1b] text-white border-b-2 outline-none px-3 py-3 text-base 
        transition-all duration-300 placeholder:text-[#4d4732] font-[Inter,sans-serif]
        ${errors[fieldName] 
            ? 'border-red-500 focus:border-red-500 shadow-[0_4px_12px_-4px_rgba(239,68,68,0.2)]' 
            : 'border-[#4d4732] focus:border-[#FFD700] hover:bg-[#232222]'}
    `;

    return (
        <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-sans selection:bg-[#FFD700] selection:text-[#131313] overflow-hidden relative">
            {/* Background Decorative Glow (subtle) */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFD700] opacity-[0.02] rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>

            <div className={`max-w-6xl mx-auto px-6 lg:px-12 transition-all duration-1000 ease-out transform relative z-10 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

                {/* Nav Brand & Header */}
                <div className="pt-8 pb-2 flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-[#FFD700] text-xs font-bold tracking-[0.25em] uppercase font-[Manrope,sans-serif] mb-6 block animate-pulse">
                            Snitch.
                        </span>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="text-[#d0c6ab] hover:text-[#FFD700] hover:-translate-x-1 transition-all duration-300 text-xl leading-none"
                                aria-label="Go back"
                            >
                                ←
                            </button>
                            <div className="relative group cursor-default">
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-[Manrope,sans-serif]">
                                    New Listing
                                </h1>
                                <div className="mt-2 h-[2px] w-16 bg-gradient-to-r from-[#e9c400] to-[#FFD700] group-hover:w-full transition-all duration-500 ease-out" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="pt-10 pb-20 relative">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 lg:items-start">

                        {/* ── LEFT COLUMN — text fields ── */}
                        <div className="flex flex-col gap-10">

                            {/* Product Title */}
                            <div className="flex flex-col gap-2 group">
                                <label
                                    htmlFor="title"
                                    className={`text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 font-[Inter,sans-serif] ${errors.title ? 'text-red-500' : 'text-[#FFD700]/70 group-focus-within:text-[#FFD700]'}`}
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
                                    className={`text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 font-[Inter,sans-serif] ${errors.description ? 'text-red-500' : 'text-[#FFD700]/70 group-focus-within:text-[#FFD700]'}`}
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
                                <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#FFD700]/70 font-[Inter,sans-serif]">
                                    Pricing
                                </label>
                                <div className="flex gap-4 items-start">
                                    {/* Amount */}
                                    <div className="flex flex-col gap-1 flex-[2] group">
                                        <span className={`text-[9px] uppercase tracking-widest transition-colors ${errors.priceAmount ? 'text-red-500' : 'text-[#999077] group-focus-within:text-[#FFD700]/70'} font-[Inter,sans-serif]`}>Amount</span>
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
                                        <span className="text-[9px] uppercase tracking-widest text-[#999077] group-focus-within:text-[#FFD700]/70 transition-colors font-[Inter,sans-serif]">Currency</span>
                                        <select
                                            id="priceCurrency"
                                            name="priceCurrency"
                                            value={formData.priceCurrency}
                                            onChange={handleChange}
                                            className="bg-[#1c1b1b] text-white border-b-2 border-[#4d4732] focus:border-[#FFD700] hover:bg-[#232222] outline-none px-3 py-3 text-base transition-all duration-300 font-[Inter,sans-serif] w-full cursor-pointer appearance-none"
                                        >
                                            {CURRENCIES.map(c => (
                                                <option key={c} value={c} className="bg-[#131313]">{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {errors.priceAmount && <span className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.priceAmount}</span>}
                            </div>

                        </div>

                        {/* ── RIGHT COLUMN — images ── */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between mt-2">
                                <label className={`text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors font-[Inter,sans-serif] ${errors.images ? 'text-red-500' : 'text-[#FFD700]/70'}`}>
                                    Media Gallery
                                </label>
                                <span className={`text-[10px] font-[Inter,sans-serif] transition-colors ${images.length === MAX_IMAGES ? 'text-[#FFD700]' : 'text-[#999077]'}`}>
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
                                    border-2 border-dashed rounded-lg px-6 py-12 lg:py-20 flex flex-col items-center gap-4 cursor-pointer transition-all duration-300 ease-out
                                    ${errors.images ? 'border-red-500/50 bg-red-500/5 hover:border-red-500' : 
                                      isDragging
                                        ? 'border-[#FFD700] bg-[#FFD700]/10 scale-[1.02] shadow-[0_0_30px_rgba(255,215,0,0.15)]'
                                        : 'border-[#4d4732] hover:border-[#FFD700]/60 hover:bg-[#1c1b1b] hover:shadow-lg'
                                    }
                                `}
                                >
                                    <div className={`transform transition-transform duration-500 ${isDragging ? '-translate-y-2' : 'group-hover:-translate-y-2'}`}>
                                        <span className={`text-4xl transition-colors duration-300 ${isDragging ? 'text-[#FFD700]' : 'text-[#999077] group-hover:text-[#FFD700]'}`}>
                                            ↑
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-[#d0c6ab] leading-relaxed font-[Inter,sans-serif]">
                                            Drop high-res images here or{' '}
                                            <span className="text-[#FFD700] underline underline-offset-4 decoration-[#FFD700]/40 group-hover:decoration-[#FFD700] transition-colors duration-300">browse files</span>
                                        </p>
                                        <p className="text-[10px] text-[#4d4732] uppercase tracking-wider font-[Inter,sans-serif] mt-2 group-hover:text-[#6b6247] transition-colors">
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
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
                                    {images.map((img, index) => (
                                        <div
                                            key={img.preview} // Better key if using unique previews
                                            className="relative aspect-square rounded-lg overflow-hidden bg-[#201f1f] group ring-1 ring-white/5 hover:ring-[#FFD700]/50 transition-all duration-300 transform animate-fadeInScale shadow-lg"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <img
                                                src={img.preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            {/* Remove Button */}
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute inset-0 flex items-center justify-center scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 text-white"
                                                aria-label={`Remove image ${index + 1}`}
                                            >
                                                <div className="bg-red-500/90 hover:bg-red-500 backdrop-blur-sm p-3 rounded-full shadow-xl hover:scale-110 transition-transform">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                    </div>

                    {/* Submit Component */}
                    <div className="mt-16 lg:mt-20 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`
                                relative overflow-hidden group
                                w-full lg:w-auto min-w-[240px] bg-[#FFD700] text-[#131313] font-bold tracking-widest py-4 px-10 rounded-lg 
                                transition-all duration-300 ease-out font-[Inter,sans-serif] text-sm uppercase
                                disabled:opacity-70 disabled:cursor-not-allowed
                                ${!isSubmitting && 'hover:shadow-[0_8px_30px_-4px_rgba(255,215,0,0.4)] hover:-translate-y-1 active:translate-y-0'}
                            `}
                        >
                            <div className={`absolute inset-0 bg-white/20 origin-left transform transition-transform duration-500 ease-out ${isSubmitting ? 'translate-x-0 opacity-50' : '-translate-x-full group-hover:translate-x-0'}`}></div>
                            
                            <span className="relative flex items-center justify-center gap-3">
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-[#131313]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Publishing...
                                    </>
                                ) : (
                                    <>
                                        Publish Listing
                                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Global animations injected using a small style tag since tailwind.config isn't easily modifiable here */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-5px); }
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