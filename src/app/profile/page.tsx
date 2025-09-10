"use client"
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log("Logout failed:", error.message);

            toast.error("Logout failed. Please try again.",error.message);

        }   
    }

    return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
            <h1 className="text-center text-white text-2xl" >Profile</h1>
            <hr />
            <p>Profile Page</p>
            <hr />
            <button 
            onClick={logout}
            className=" bg-blue-600 mt-3.5 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>
    )
}