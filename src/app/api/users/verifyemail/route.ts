import {connect} from "@/dbConfig/dbConfig";

import { NextResponse, NextRequest} from "next/server";
import User from "@/models/userModel";

connect();

export const function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log("Token received:", token);
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()},
        });
        if(!user){
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400});
        }
        console.log("User found:", user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({
            message: "Email verified successfully",
            success:true
        }, {status: 200});
    } catch (error: any) {
        console.log("Error in verify email:", error.message);
        return NextResponse.json({
            error:error.message}, {status: 500});
    }
}
export const function GET(request: NextRequest){
    try {
        const {searchParams} = new URL(request.url);        
        const token = searchParams.get("token");
        if(!token){
            return NextResponse.json({message: "Invalid request"}, {status: 400});
        }
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()},
        });
        if(!user){
            return NextResponse.json({message: "Invalid or expired token"}, {status: 400});
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({message: "Email verified successfully"}, {status: 200});
    } catch (error: any) {
        console.log("Error in verify email:", error.message);
        return NextResponse.json({message: "Internal server error"}, {status: 500});
    }   
}