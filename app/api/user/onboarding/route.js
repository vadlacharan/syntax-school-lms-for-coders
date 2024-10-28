import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { sendStatusCode } from "next/dist/server/api-utils"

import { NextResponse } from "next/server"

export async function POST(req,res){
    const user = await currentUser()

    const data = await req.json()
    
    try{
        
        if( data.key === 'master'){
            const usertype = await prisma.user_roles.create({
                data: {
                    userid: user.id,
                    ismaster: true
                }
            })

        }else if( data.key === 'student'){
            const usertype = await prisma.user_roles.create({
                data: {
                    userid: user.id,
                    ismaster: false
                }
            })

        }
    }
    catch(err){

        return NextResponse.json({ error : "User Role Already Assigned! you are restricted to modify"}, { status: 403})

    }
    return NextResponse.json({ "userType" : "key"})

}