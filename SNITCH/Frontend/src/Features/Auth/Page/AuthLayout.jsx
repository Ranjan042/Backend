import React from 'react';

const AuthLayout = ({ children, title, subtitle, disableScroll = false }) => {
  return (
    <div className="h-screen w-full flex bg-white text-black font-inter overflow-hidden">
      {/* LEFT IMAGE PANEL */}
      <div className="hidden lg:block lg:w-1/2 h-full relative bg-gray-100">
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop" 
          alt="Fashion Model" 
          className="w-full h-full object-cover grayscale opacity-90 object-top"
        />
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute bottom-12 left-12 text-white">
          <h1 className="font-space font-bold text-6xl tracking-tighter uppercase whitespace-nowrap">SNITCH</h1>
          <p className="mt-3 text-sm uppercase tracking-[0.3em]">Define Your Style</p>
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className={`w-full lg:w-1/2 h-full ${disableScroll ? 'overflow-hidden' : 'overflow-y-auto'} bg-white p-6 sm:p-12 lg:p-20 flex flex-col relative`}>
        <div className="w-full max-w-md m-auto py-8">
          {/* Mobile Brand */}
          <div className="lg:hidden text-center mb-10">
            <h1 className="font-space font-bold text-4xl tracking-tighter uppercase bg-gradient-to-r from-gray-500 via-black to-gray-100 text-transparent bg-clip-text">SNITCH</h1>
            <p className="mt-2 text-xs uppercase tracking-widest text-gray-500">Define Your Style</p>
          </div>
          
          <div className="mb-8">
              <h2 className="font-space font-bold text-2xl uppercase tracking-widest text-black">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-2 text-sm text-gray-500 font-inter">
                  {subtitle}
                </p>
              )}
          </div>
          
          {children}
          
          {/* Footer links */}
          <div className="mt-12 flex items-center justify-center gap-6 text-gray-400 text-xs uppercase tracking-widest">
            <button className="hover:text-black transition-colors cursor-pointer">Terms</button>
            <span className="w-[1px] h-3 bg-gray-300"></span>
            <button className="hover:text-black transition-colors cursor-pointer">Privacy</button>
            <span className="w-[1px] h-3 bg-gray-300"></span>
            <button className="hover:text-black transition-colors cursor-pointer">Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
