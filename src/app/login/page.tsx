"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";



export default function LoginPage() {

  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [buttonDisabled,setButtonDisabled] = useState("false");
  const [loading, setLoading] = useState(false);
  
  
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login successful", response.data);
      toast.success("Login successful");
      router.push("/profile");
      
    } catch (error: any) {
      console.log("Login failed",error.message);
      toast.error("Login failed. Please try again later.",error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])

return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
        <h1 className="text-center text-white text-2xl" >{loading ? "processing" : "Login"}</h1>
        <hr />
  
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
        className="bg-blue-500 text-white p-2 m-2 rounded" 
        onClick={onLogin}>Login</button>
        <Link href="/signup" className="text-white">Dont have an account? Sign Up</Link>
    </div>
  )
}