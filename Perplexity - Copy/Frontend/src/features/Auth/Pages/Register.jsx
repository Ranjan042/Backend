import { Link, useNavigate } from 'react-router'
import { RiEyeCloseLine,RiMailLine, RiUserLine } from "@remixicon/react";
import { useState } from 'react';
const Register = () => {

  const [email, setemail] = useState("")
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")

  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    console.log("Form Submitted:",email)
    console.log("Form Submitted:",username)
    console.log("Form Submitted:",password)
    e.preventDefault();
    await HandleRegister(username,email,password)
    navigate("/login")
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-primary)]">
      <form onSubmit={handleSubmit} className="w-full flex flex-col rounded-2xl p-5 max-w-[370px] gap-4 bg-[var(--card-bg)]">
        <h1 className="text-3xl max-w-[40%] text-[var(--text-secondary)] font-semibold leading-snug family-Roboto ">
         Let's Get Started
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

        <label htmlFor="username" className="text-[var(--text-primary)]">
          Username
        </label>

        <div className='w-full relative'>
          <input
            onChange={(e)=>{setusername(e.target.value)}}
            type="text"
            id="username"
            name="username"
            autoComplete="new-password"
            className="p-2 w-full bg-[var(--input-bg)] text-[var(--text-secondary)] "
            placeholder="test@test.com"
          />
          <RiUserLine className="text-[var(--text-secondary)] absolute right-3 top-3 " size={16} />
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
          placeholder="********"
        />

        <RiEyeCloseLine className="text-[var(--text-secondary)] absolute right-3 top-3" size={16}/>
      </div>
       
        <button className="bg-[var(--button)] text-[var(--bg-primary)] rounded-full p-2">Sign Up</button>

        <p className="text-[var(--text-secondary)]">
          Already have an account?
          <Link to="/login" className="text-blue-400"> Sign in</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
