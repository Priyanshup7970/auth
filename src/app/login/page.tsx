"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";
import { useState } from "react";



export default function LoginPage() {

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const onLogin = async () => {}

return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
        <h1 className="text-center text-white text-2xl" >Login</h1>
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
        <Link href="/signup" className="text-white">Don't have an account? Sign Up</Link>
    </div>
  )
}