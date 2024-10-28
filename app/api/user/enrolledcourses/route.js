import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"
import { NextResponse } from "next/server";

export async function GET(req,res){
    

    const user = await currentUser();

    const enrolledcourses = await prisma.course_enrollment.findMany({
        where: {
            userid: user.id
        },
        include: {
            course: true
        }
    })
    

    return NextResponse.json({ "enrolledcourses" : enrolledcourses })
}