import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        if (!userID) {
        return NextResponse.json(
            { message: 'Invalid token' },
            { status: 401 }
        );
        }
        const user = await User.findOne({_id: userID}).select("-password");
         if (!user) {
            return NextResponse.json(
                { message: 'User not found' }, 
                { status: 404 }
            );
        }
        return NextResponse.json({
            message: 'User fetched successfully',
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}