import { currentUser } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function POST(req,res){
    const user = await currentUser()

    const courses = await prisma.course.findMany({
        where: {
            author: user.id
        },
        select:{
            title: true,
            id: true
        }
    })

    return NextResponse.json({ "courses": courses})
}