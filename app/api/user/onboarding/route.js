import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { sendStatusCode } from "next/dist/server/api-utils"
import { redirect } from "next/navigation"

import { NextResponse } from "next/server"

export async function POST(req,res){
    const user = await currentUser()

    const data = await req.json()
    
    try{
        
        if( data.key === 'master'){
            const usertype = await prisma.user_roles.create({
                data: {
                    userid: user.id,
                    ismaster: true,
                    username: user.username
                }
            })

        }else if( data.key === 'student'){
            const usertype = await prisma.user_roles.create({
                data: {
                    userid: user.id,
                    ismaster: false,
                    username: user.username
                }
            })

        }
    }
    catch(err){

        return NextResponse.json({ error : "User Role Already Assigned! you are restricted to modify"}, { status: 403})

    }
    return NextResponse.json({ "userType" : "key"})

}
export async function GET(req,res){
    const user = await currentUser()
    if(!user){
        return NextResponse.json({"path": "/"})
    }

    const userrole = await prisma.user_roles.findUnique({
        where:{
            userid: user.id
        },
        select:{
            ismaster:true
        }
    })

       
        if( userrole.ismaster){
            return NextResponse.json({ "path": "/master/dashboard" })
        }else{
            return NextResponse.json({"path":"/user/dashboard"})
        }

   
}