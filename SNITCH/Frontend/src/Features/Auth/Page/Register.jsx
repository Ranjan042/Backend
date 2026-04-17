import React, { useState } from 'react';
import { Link } from 'react-router';
import AuthLayout from './AuthLayout';
import { useAuth } from '../Hook/UseAuth';
import CWG from './Components/CWG';

const Register = () => {
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    PhoneNumber: '',
    Password: '',
    isSeller: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const { HandleRegister } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await HandleRegister(formData);
    setFormData({
      FullName: '',
      Email: '',
      PhoneNumber: '',
      Password: '',
      isSeller: false,
    });
  };

  return (
    <AuthLayout title="Register" subtitle="Join the SNITCH experience.">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="register-fullname" className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-2">
            Full Name
          </label>
          <input
            id="register-fullname"
            name="FullName"
            type="text"
            value={formData.FullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400 rounded-none"
            required
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="register-email" className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-2">
            Email Address
          </label>
          <input
            id="register-email"
            name="Email"
            type="email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400 rounded-none"
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="register-contact" className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-2">
            Contact Number
          </label>
          <input
            id="register-contact"
            name="PhoneNumber"
            type="tel"
            value={formData.PhoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400 rounded-none"
            required
            autoComplete="tel"
          />
        </div>

        <div>
          <label htmlFor="register-password" className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="register-password"
              name="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.Password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full border-b border-gray-300 py-3 pr-10 text-sm focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400 rounded-none"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-black transition-colors"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <div className="relative flex items-center">
            <input
              id="register-isSeller"
              name="isSeller"
              type="checkbox"
              checked={formData.isSeller}
              onChange={handleChange}
              className="peer appearance-none w-4 h-4 border border-gray-400 rounded-none checked:bg-black checked:border-black cursor-pointer transition-colors"
            />
            <svg 
              className="absolute left-0 w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <label
            htmlFor="register-isSeller"
            className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-600 cursor-pointer select-none hover:text-black transition-colors"
          >
            Register as a <span className="text-black">Seller</span>
          </label>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-900 py-3.5 font-space text-xs font-bold tracking-[0.2em] uppercase transition-colors"
          >
            Create Account
          </button>
        </div>

        <div className="relative flex items-center justify-center pt-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative bg-white px-4 text-[10px] uppercase tracking-widest text-gray-400">
            Or
          </div>
        </div>

        <CWG />

        <div className="text-center pt-2">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-black font-bold hover:underline transition-all"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
