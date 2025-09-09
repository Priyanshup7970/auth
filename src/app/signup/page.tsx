"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import { useState } from "react";
import toast from "react-hot-toast";



export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  
  
  const onSignup = async () => { 
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup success", response.data);
      router.push("/login")
      toast.success("Signup Success! Please login")
      
    } catch (error: any) {
      toast.error("Something went wrong");
      console.log("Signup failed", error.message);
    }finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
    }, [user])
  

return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
        <h1 className="text-center text-white text-2xl" >{loading ? "Processing" :"Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
        id="username"
        type="text" 
        value={user.username}
        placeholder="username" 
        className="p-2 border border-gray-300 rounded-lg mb-3.5 focus:outline-none focus:border-gray-700"
        onChange={(e) => setUser({...user, username: e.target.value})} />
        <label htmlFor="email">Email</label>
        <input
         type="email" 
         placeholder="Email" 
         className="p-2 m-2 rounded" 
         onChange={(e) => setUser({...user, email: e.target.value})} />
        <label htmlFor="password">password</label>
        <input 
        id="password"
        type="password" 
        value={user.password}
        placeholder="Password" 
        className="p-2 m-2 rounded" 
        onChange={(e) => setUser({...user, password: e.target.value})} />
        <button 
        className="bg-blue-500 p-2 m-2 rounded text-black" 
        onClick={onSignup}>{buttonDisabled ? "No signup" : "signup"}</button>
        <Link href="/login" className="text-white">Already have an account? Login</Link>
    </div>
  )
}