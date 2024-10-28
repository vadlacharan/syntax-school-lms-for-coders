import { currentUser } from "@clerk/nextjs/server";
import { CloudFog } from "lucide-react";
import { NextResponse } from "next/server";

export async function GET(req, res) {

    const session = await currentUser()
    console.log(session.fullName)
    return NextResponse.json({"username": session.fullName})
    
}