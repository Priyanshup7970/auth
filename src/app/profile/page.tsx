"use client"
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { link } from "fs";
import { get } from "http";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing");
    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log("Logout failed:", error.message);

            toast.error("Logout failed. Please try again.",error.message);

        }   
    }
    const getUserDetails = async () => {
            const res = await axios.get('/api/users/me');
            console.log("User details:", res.data);
            setData(res.data.data._id);
    }
    return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
            <h1 className="text-center text-white text-2xl" >Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button 
            onClick={logout}
            className=" bg-blue-600 mt-3.5 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Logout</button>
            <button 
            onClick={getUserDetails}
            className=" bg-purple-900 mt-3.5 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">GetUser Details</button>
        </div>
    )
}