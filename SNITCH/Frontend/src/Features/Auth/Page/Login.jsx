import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import AuthLayout from './AuthLayout';
import { useAuth } from '../Hook/UseAuth';
import CWG from './Components/CWG';
import { useSelector } from 'react-redux';

const Login = () => {
  const { HandleLogin } = useAuth();
  const navigate = useNavigate();

  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);

  if(!loading && user) return <Navigate to="/" />;

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
    });
  };

  return (
    <AuthLayout title="Login" subtitle="Please enter your details to sign in." disableScroll={true}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="login-email" className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-2">
            Email
          </label>
          <input
            id="login-email"
            name="Email"
            type="email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400 rounded-none"
            required
            autoComplete="email"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="login-password" className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-900">
              Password
            </label>
            <button
              type="button"
              className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 hover:text-black transition-colors"
            >
              Forgot?
            </button>
          </div>
          <div className="relative">
            <input
              id="login-password"
              name="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.Password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border-b border-gray-300 py-3 pr-10 text-sm focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400 rounded-none"
              required
              autoComplete="current-password"
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

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-900 py-3.5 font-space text-xs font-bold tracking-[0.2em] uppercase transition-colors"
          >
            Sign In
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
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-black font-bold hover:underline transition-all"
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
