export default function UserProfile({params}: any) {
    return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
            <h1 className="text-center text-white text-2xl" >profile</h1>
            <hr />
            <p className="text-4xl">Profile Page 
                <span className="p-2 ml-2 rounded bg-blue-600 text-white">{params.id}</span>
                </p>
        </div>
    )
}