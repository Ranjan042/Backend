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
    <AuthLayout title="Create Account" subtitle="Join the SNITCH experience.">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div className="animate-fade-up-delay-2 opacity-0">
          <label
            htmlFor="register-fullname"
            className="block font-space text-[10px] font-semibold tracking-[0.2em] uppercase text-gold-500/80 mb-2"
          >
            Full Name
          </label>
          <input
            id="register-fullname"
            name="FullName"
            type="text"
            value={formData.FullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="auth-input"
            required
            autoComplete="name"
          />
        </div>

        {/* Email */}
        <div className="animate-fade-up-delay-2 opacity-0" style={{ animationDelay: '0.25s' }}>
          <label
            htmlFor="register-email"
            className="block font-space text-[10px] font-semibold tracking-[0.2em] uppercase text-gold-500/80 mb-2"
          >
            Email Address
          </label>
          <input
            id="register-email"
            name="Email"
            type="email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="auth-input"
            required
            autoComplete="email"
          />
        </div>

        {/* Contact */}
        <div className="animate-fade-up-delay-3 opacity-0">
          <label
            htmlFor="register-contact"
            className="block font-space text-[10px] font-semibold tracking-[0.2em] uppercase text-gold-500/80 mb-2"
          >
            Contact Number
          </label>
          <input
            id="register-contact"
            name="PhoneNumber"
            type="tel"
            value={formData.PhoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="auth-input"
            required
            autoComplete="tel"
          />
        </div>

        {/* Password */}
        <div className="animate-fade-up-delay-3 opacity-0" style={{ animationDelay: '0.35s' }}>
          <label
            htmlFor="register-password"
            className="block font-space text-[10px] font-semibold tracking-[0.2em] uppercase text-gold-500/80 mb-2"
          >
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
              className="auth-input pr-12"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-gold-500/70 transition-colors duration-300"
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

        {/* isSeller Checkbox */}
        <div className="animate-fade-up-delay-4 opacity-0 flex items-center gap-3 pt-1">
          <input
            id="register-isSeller"
            name="isSeller"
            type="checkbox"
            checked={formData.isSeller}
            onChange={handleChange}
            className="gold-checkbox"
          />
          <label
            htmlFor="register-isSeller"
            className="font-inter text-xs text-white/50 cursor-pointer select-none hover:text-white/70 transition-colors duration-300"
          >
            Register as a <span className="text-gold-500/80 font-medium">Seller</span>
          </label>
        </div>

       

        {/* Submit Button */}
        <div className="animate-fade-up-delay-4 opacity-0 pt-2" style={{ animationDelay: '0.45s' }}>
          <button
            type="submit"
            id="register-submit"
            className="w-full gold-gradient-hover py-3.5 text-gold-900 font-space text-xs font-bold tracking-[0.2em] uppercase cursor-pointer transition-all duration-400"
          >
            Create Account
          </button>
        </div>

        <CWG />

        {/* Login Link */}
        <div className="animate-fade-up-delay-5 opacity-0 text-center pt-2">
          <p className="font-inter text-xs text-white/30 tracking-wide">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-gold-500 font-semibold hover:text-gold-300 transition-colors duration-300 uppercase tracking-[0.1em]"
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
