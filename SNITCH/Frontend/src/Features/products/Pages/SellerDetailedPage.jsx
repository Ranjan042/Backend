import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../Hook/UseProduct';

const SellerDetailedPage = () => {
  const { HandleGetSelectedProduct, HandleAddVarientInProducts, selectedProduct } = useProduct();
  const { id } = useParams();

  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [formData, setFormData] = useState({
    priceAmount: '',
    priceCurrency: 'INR',
    stock: '',
    attributeKey: '',
    attributeValue: ''
  });
  const [attributes, setAttributes] = useState({});
  const [files, setFiles] = useState([]);
  
  // State for the main header image
  const [currentHeaderImage, setCurrentHeaderImage] = useState(null);

  useEffect(() => {
    if (id) {
      HandleGetSelectedProduct(id);
    }
  }, []);

  // Update current header image when selectedProduct changes
  useEffect(() => {
    if (selectedProduct?.images && selectedProduct.images.length > 0) {
      setCurrentHeaderImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAttribute = () => {
    if (formData.attributeKey && formData.attributeValue) {
      setAttributes(prev => ({
        ...prev,
        [formData.attributeKey]: formData.attributeValue
      }));
      setFormData(prev => ({ ...prev, attributeKey: '', attributeValue: '' }));
    }
  };

  const handleRemoveAttribute = (key) => {
    const newAttrs = { ...attributes };
    delete newAttrs[key];
    setAttributes(newAttrs);
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('priceAmount', formData.priceAmount);
    data.append('priceCurrency', formData.priceCurrency);
    data.append('stock', formData.stock);
    
    Object.entries(attributes).forEach(([k, v]) => {
      data.append(`attributes[${k}]`, v);
    });

    files.forEach(file => {
      data.append('images', file);
    });

    try {
        await HandleAddVarientInProducts(id, data);
        setIsAddingVariant(false);
        setFormData({ priceAmount: '', priceCurrency: 'INR', stock: '', attributeKey: '', attributeValue: '' });
        setAttributes({});
        setFiles([]);
        HandleGetSelectedProduct(id);
    } catch(err) {
        console.error(err);
    }
  };

  if (!selectedProduct) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading details...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Product Header */}
        <div className="bg-white p-6 shadow-sm flex flex-col md:flex-row gap-10">
          
          {/* Images Section */}
          <div className="md:w-1/2 w-full flex flex-col-reverse sm:flex-row gap-4 h-full md:h-[600px]">
             {selectedProduct.images && selectedProduct.images.length > 0 ? (
               <>
                 {/* Thumbnails (Left side on desktop, bottom on mobile) */}
                 <div className="flex flex-row sm:flex-col gap-3 overflow-y-auto sm:w-24 no-scrollbar pb-2 sm:pb-0">
                    {selectedProduct.images.map((img, index) => (
                      <div 
                        key={img._id || index}
                        onMouseEnter={() => setCurrentHeaderImage(img.url)}
                        onClick={() => setCurrentHeaderImage(img.url)}
                        className={`cursor-pointer overflow-hidden flex-shrink-0 w-20 sm:w-full aspect-[4/5] bg-gray-100 transition-all ${currentHeaderImage === img.url ? 'ring-2 ring-black ring-offset-2 opacity-100' : 'opacity-60 hover:opacity-100'}`}
                      >
                         <img src={img.url} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                 </div>
                 
                 {/* Main 4:5 Image */}
                 <div className="flex-1 w-full relative bg-gray-100 overflow-hidden flex items-center justify-center">
                    <img src={currentHeaderImage || selectedProduct.images[0].url} alt={selectedProduct.title} className="w-full h-full object-cover aspect-[4/5] transition-opacity duration-300" />
                 </div>
               </>
             ) : (
               <div className="w-full aspect-[4/5] flex items-center justify-center text-gray-400 bg-gray-100">No Image</div>
             )}
          </div>
          
          {/* Product Info Description */}
          <div className="md:w-1/2 flex flex-col justify-center space-y-6">
             <div>
                <h1 className="text-3xl sm:text-4xl font-semibold mb-3">{selectedProduct.title}</h1>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{selectedProduct.description}</p>
             </div>
             <div className="text-2xl font-medium text-gray-900">
               {selectedProduct.price?.currency} {selectedProduct.price?.amount}
             </div>
             <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:gap-6 mt-6 pt-6 border-t border-gray-100">
                <p>Added on {new Date(selectedProduct.createdAt).toLocaleDateString()}</p>
                <p className="hidden sm:block">•</p>
                <p>Updated on {new Date(selectedProduct.updatedAt).toLocaleDateString()}</p>
             </div>
          </div>
        </div>

        {/* Variants Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center pb-2 border-b border-gray-200">
            <h2 className="text-2xl font-semibold">Variants</h2>
            <button 
              onClick={() => setIsAddingVariant(!isAddingVariant)}
              className="mt-4 sm:mt-0 bg-black text-white px-5 py-2 hover:bg-gray-800 transition shadow-sm text-sm"
            >
              {isAddingVariant ? 'Cancel' : '+ Add Variant'}
            </button>
          </div>

          {/* Add Variant Form */}
          {isAddingVariant && (
            <div className="bg-white p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-6">New Variant Details</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Amount *</label>
                    <input 
                      type="number" 
                      name="priceAmount" 
                      value={formData.priceAmount} 
                      onChange={handleInputChange} 
                      required
                      className="w-full bg-gray-50 p-2.5 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <input 
                      type="text" 
                      name="priceCurrency" 
                      value={formData.priceCurrency} 
                      onChange={handleInputChange} 
                      className="w-full bg-gray-50 p-2.5 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                    <input 
                      type="number" 
                      name="stock" 
                      value={formData.stock} 
                      onChange={handleInputChange} 
                      required
                      className="w-full bg-gray-50 p-2.5 focus:outline-none focus:ring-2 focus:ring-black" 
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-5">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Attributes (e.g., Color, Size)</label>
                  <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <input 
                      type="text" 
                      name="attributeKey" 
                      placeholder="Property (e.g. Size)" 
                      value={formData.attributeKey} 
                      onChange={handleInputChange}
                      className="flex-1 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    />
                    <input 
                      type="text" 
                      name="attributeValue" 
                      placeholder="Value (e.g. XL)" 
                      value={formData.attributeValue} 
                      onChange={handleInputChange}
                      className="flex-1 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    />
                    <button type="button" onClick={handleAddAttribute} className="bg-gray-200 text-gray-800 px-4 py-2 hover:bg-gray-300 transition text-sm font-medium">
                      Add
                    </button>
                  </div>
                  {Object.keys(attributes).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {Object.entries(attributes).map(([k, v]) => (
                            <div key={k} className="bg-white px-3 py-1 flex items-center text-sm shadow-sm text-gray-600">
                                <span className="font-medium mr-1 capitalize">{k}:</span> 
                                <span className="mr-2">{v}</span>
                                <button type="button" onClick={() => handleRemoveAttribute(k)} className="text-gray-400 hover:text-red-500 font-bold ml-1 w-5 h-5 flex items-center justify-center transition">×</button>
                            </div>
                        ))}
                    </div>
                  )}
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Images *</label>
                   <input 
                     type="file" 
                     multiple 
                     onChange={handleFileChange} 
                     className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" 
                     required 
                   />
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className="bg-black text-white px-8 py-2.5 hover:bg-gray-800 transition font-medium">
                    Save Variant
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Variants Grid */}
          <div className="flex flex-wrap gap-6">
            {selectedProduct.variant && selectedProduct.variant.length > 0 ? (
                selectedProduct.variant.map((v, index) => (
                    <div key={v._id || index} className="w-[200px] flex-shrink-0 bg-white overflow-hidden hover:shadow-md transition duration-200 flex flex-col shadow-sm text-sm border border-gray-100">
                       <div className="w-full aspect-[3/4] bg-gray-50 relative">
                          {v.images && v.images.length > 0 ? (
                            <img src={v.images[0].url} alt={`Variant ${index}`} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                          )}
                          <div className={`absolute top-1 right-1 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${v.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                             {v.stock > 0 ? `${v.stock} in stock` : 'Out of stock'}
                          </div>
                       </div>
                       
                       <div className="p-3 flex flex-col flex-grow">
                         <div className="font-semibold text-base mb-2 text-gray-900">
                            {v.price?.currency} {v.price?.amount}
                         </div>

                         <div className="mt-auto space-y-1">
                            {v.attributes && Object.keys(v.attributes).length > 0 ? (
                                Object.entries(v.attributes).map(([key, value]) => (
                                  <div key={key} className="flex justify-between text-xs">
                                      <span className="text-gray-500 capitalize truncate mr-2">{key}</span>
                                      <span className="text-gray-900 font-medium truncate">{value}</span>
                                  </div>
                                ))
                            ) : (
                                <div className="text-xs text-gray-400 italic">Standard</div>
                            )}
                         </div>
                       </div>
                    </div>
                ))
            ) : (
                <div className="col-span-full border border-dashed border-gray-300 py-8 text-center bg-gray-50">
                    <p className="text-gray-500 text-sm">No variants added yet.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDetailedPage;
