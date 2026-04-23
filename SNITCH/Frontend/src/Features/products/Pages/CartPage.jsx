import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../Hook/UseProduct";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart } = useSelector((state) => state.product);

  const { HandleGetCart, HandleIncreaseProductQuantity, HandleDecreaseProductQuantity, HandleRemoveFromCart } = useProduct();

  useEffect(() => {
    HandleGetCart();
  }, []);

  const cartItems = cart?.cartItems || [];
  const total = cartItems.reduce((acc, item) => {
    return acc + (item.product?.price?.amount || 0) * item.quantity;
  }, 0);

  const getCurrencySymbol = (currency) =>
    currency === "INR" ? "₹" : currency === "USD" ? "$" : "₹";
  const currencySymbol =
    cartItems.length > 0
      ? getCurrencySymbol(cartItems[0]?.product?.price?.currency)
      : "₹";

  const imageBackgrounds = [
    "bg-[#b4cce0]",
    "bg-[#f0f0f0]",
    "bg-[#efebe8]",
    "bg-[#e0e5df]",
  ];

  return (
    <div className="min-h-screen bg-[#e5e5e5] flex items-center justify-center p-4 md:p-8 font-['Space_Grotesk',_sans-serif] tracking-wide text-black selection:bg-black selection:text-white">
      <div className="bg-white w-full max-w-5xl px-8 py-10 sm:px-14 sm:py-16 shadow-xl rounded-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-6 gap-4">
          <div className="flex items-baseline gap-4">
            <h1 className="text-[22px] font-bold tracking-tight text-black">
              Your Cart
            </h1>
            <span className="text-[11px] font-bold text-gray-400">
              {cartItems.length} items
            </span>
          </div>
          {cartItems.length > 0 && (
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold text-gray-500">Total</span>
              <span className="text-xl font-bold text-black">
                {currencySymbol}
                {total.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-gray-100 mb-2"></div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-gray-400 text-sm mb-6 font-medium">
              Your cart is empty.
            </p>
            <Link
              to="/"
              className="text-xs font-bold text-black border-b-[1.5px] border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex flex-col text-black">
              {cartItems.map((item, index) => {
                
                const selectedVariant = item.product?.variant?.find(
                  (v) => v._id.toString() === item.varient.toString(),
                );

                // console.log("selectedVarient",selectedVariant)

                const bgClass =
                  imageBackgrounds[index % imageBackgrounds.length];
                return (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-8 border-b border-gray-100 gap-6 w-full last:border-b-0"
                  >
                    {/* Left - Image & Description */}
                    <div className="flex items-center gap-8 flex-1 w-full sm:w-auto">
                      <div
                        className={`w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center p-4 ${bgClass}`}
                      >
                        <img
                          src={
                            item.product?.images?.[0]?.url ||
                            "https://via.placeholder.com/300"
                          }
                          alt={item.product?.title}
                          className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-sm"
                        />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <h3 className="font-bold text-[13px] sm:text-sm text-black mb-3 truncate">
                          {item.product?.title}
                        </h3>
                        {/* <p className="text-[10px] sm:text-[11px] text-gray-400 line-clamp-1 sm:line-clamp-2 max-w-[200px] leading-relaxed font-medium">
                          {item.product?.description ||
                            "Short description of product written here"}
                        </p> */}
                        {selectedVariant?.attributes && 
                          Object.entries(selectedVariant.attributes).map(([key, value]) => (
                            <p key={key} className="text-[10px] sm:text-[11px] text-gray-400 mt-1">
                              <span className="font-bold">{key}:</span> {value}
                            </p>
                          ))
                          }

                      </div>
                    </div>

                    {/* Middle - Quantity Controls */}
                    <div className="flex items-center shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-gray-400 font-bold">
                          Quantity
                        </span>
                        <div className="flex items-center border border-gray-200 bg-white">
                          <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-black transition-colors text-sm"
                            onClick={() => HandleDecreaseProductQuantity(item.product._id, item.varient)}
                          >
                            &minus;
                          </button>
                          <span className="w-8 text-center text-[11px] font-bold text-black">
                            {item.quantity}
                          </span>
                          <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-black transition-colors text-sm"
                            onClick={() => HandleIncreaseProductQuantity(item.product._id, item.varient)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right - Price & Remove */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 sm:gap-14 shrink-0 w-full sm:w-20 mt-4 sm:mt-0">
                      <span className="text-sm font-bold text-black">
                        {currencySymbol}
                        {(item.product?.price?.amount || 0).toLocaleString()}
                      </span>
                      <button
                        className="text-gray-800 hover:text-black font-bold p-1 transition-colors"
                        title="Remove Item"
                        onClick={() => HandleRemoveFromCart(item.product._id, item.varient)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Separator Before Footer */}
            <div className="w-full h-[1px] bg-gray-100 mt-2"></div>

            {/* Footer Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-between items-center mt-8 gap-6">
              <Link
                to="/"
                className="text-[11px] font-bold text-black border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors tracking-wide"
              >
                Continue shopping
              </Link>
              <button className="w-full sm:w-auto bg-black text-white px-8 py-3.5 text-[11px] font-bold tracking-wide hover:bg-gray-800 transition-colors leading-none">
                Proceed to checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
