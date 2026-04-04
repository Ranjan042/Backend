import React, {useState } from "react";
import "../Style/common.css";
import { Link } from "react-router";
import {  RiEyeCloseLine,RiMailLine } from "@remixicon/react";
import { useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
const Login = () => {
  const navigate=useNavigate()

  const user=useSelector(state=>state.auth.user);
  const loading=useSelector(state=>state.auth.loading);

  if(!loading && user) navigate("/")

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const {HandleLogin}=useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:",email)
    console.log("Form Submitted:",password)

    const payload={email,password}
    
    await HandleLogin(payload)
    navigate("/")
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-primary)]">
      <form onSubmit={handleSubmit} className="w-full flex flex-col rounded-2xl p-5 max-w-[370px] gap-4 bg-[var(--card-bg)]">
        <h1 className="text-3xl max-w-0 text-[var(--text-secondary)] font-semibold leading-snug family-Roboto">
          Hey, Welcome Back
        </h1>

        <label htmlFor="email" className="text-[var(--text-primary)]">
          Email
        </label>

        <div className="w-full relative">
          <input
            onChange={(e)=>{setemail(e.target.value)}}
            type="text"
            id="email"
            name="email"
            autoComplete="new-password"
            className="p-2 w-full bg-[var(--input-bg)] text-[var(--text-secondary)] "
            placeholder="test@test.com"
          />
          <RiMailLine className="text-[var(--text-secondary)] absolute right-3 top-3 " size={16} />
        </div>

        <label htmlFor="password" className=" text-[var(--text-primary)]">Password</label>

      <div className="w-full relative">
        <input 
          onChange={(e)=>{setpassword(e.target.value)}}
          type="password"
          id="password"
          name="password"
          autoComplete="new-password"
          className="p-2 w-full bg-[var(--input-bg)] text-[var(--text-secondary)]"
          placeholder="P******d"
        />

        <RiEyeCloseLine className="text-[var(--text-secondary)] absolute right-3 top-3" size={16}/>
      </div>
       
        <button className="bg-[var(--button)] text-[var(--bg-primary)] rounded-full p-2">Sign in</button>

        <p className="text-[var(--text-secondary)]">
          Don't have an account?
          <Link to="/register" className="text-blue-400"> Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
