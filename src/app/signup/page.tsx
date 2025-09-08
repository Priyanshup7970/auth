"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";
import { useState } from "react";



export default function SignupPage() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });
  const onSignup = async () => {}

return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
        <h1 className="text-center text-white text-2xl" >Signup</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
        id="username"
        type="text" 
        value={user.username}
        placeholder="username" 
        onChange={(e) => setUser({...user, username: e.target.value})} />
        <label htmlFor="username">Email</label>
        <input type="email" placeholder="Email" className="p-2 m-2 rounded" onChange={(e) => setUser({...user, email: e.target.value})} />
        <input type="password" placeholder="Password" className="p-2 m-2 rounded" onChange={(e) => setUser({...user, password: e.target.value})} />
        <button className="bg-blue-500 text-white p-2 m-2 rounded" onClick={onSignup}>Signup</button>
        <Link href="/login" className="text-white">Already have an account? Login</Link>
    </div>
  )
}