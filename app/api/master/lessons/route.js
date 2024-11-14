import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req,res){
  const   courseid = await parseInt( req.nextUrl.searchParams.get('id'))
    const lessons = await prisma.lessons.findMany({
        where:{
            course_id: courseid
        }
    })

    

    return NextResponse.json({ "lessons":lessons})
}