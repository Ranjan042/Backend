import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import AuthLayout from './AuthLayout';
import { useAuth } from '../Hook/UseAuth';
import CWG from './Components/CWG';
import { useSelector } from 'react-redux';



const Login = () => {
  const { HandleLogin } = useAuth();
  const navigate=useNavigate();

  const user=useSelector(state=>state.auth.user);
  const loading=useSelector(state=>state.auth.loading)

  if(!loading && user) navigate("/")

  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await HandleLogin(formData);
    setFormData({
      Email: '',
      Password: '',
    })
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your account.">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="animate-fade-up-delay-2 opacity-0">
          <label
            htmlFor="login-email"
            className="block font-space text-[10px] font-semibold tracking-[0.2em] uppercase text-gold-500/80 mb-2"
          >
            Email Address
          </label>
          <input
            id="login-email"
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

        {/* Password Field */}
        <div className="animate-fade-up-delay-3 opacity-0">
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="login-password"
              className="font-space text-[10px] font-semibold tracking-[0.2em] uppercase text-gold-500/80"
            >
              Password
            </label>
            <button
              type="button"
              className="font-inter text-[10px] tracking-[0.15em] uppercase text-gold-500/50 hover:text-gold-400 transition-colors duration-300"
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <input
              id="login-password"
              name="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.Password}
              onChange={handleChange}
              placeholder="••••••••"
              className="auth-input pr-12"
              required
              autoComplete="current-password"
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

        {/* Submit Button */}
        <div className="animate-fade-up-delay-4 opacity-0 pt-2">
          <button
            type="submit"
            id="login-submit"
            className="w-full gold-gradient-hover py-3.5 text-gold-900 font-space text-xs font-bold tracking-[0.2em] uppercase cursor-pointer transition-all duration-400"
          >
            Sign In
          </button>
        </div>

        <CWG />

        

        {/* Register Link */}
        <div className="animate-fade-up-delay-5 opacity-0 text-center pt-2">
          <p className="font-inter text-xs text-white/30 tracking-wide">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-gold-500 font-semibold hover:text-gold-300 transition-colors duration-300 uppercase tracking-[0.1em]"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
