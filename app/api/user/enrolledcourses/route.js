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

export async function POST(req,res){

    const Data  = await req.json()



const student = await prisma.user_roles.findFirst({
            where:{
                username: Data.username
            },
            select: {
                userid: true
            }
        })


        
            if (!student){
                return NextResponse.json({ "message" : "Student Not Found"})
            }else{
                
                const isexist = await prisma.course_enrollment.findFirst({
                    where: {
                        course_id: Data.courseId,
                        userid: student.userid
                    },
                })

                if(isexist){
                    return NextResponse.json({"message": " User Already Enrolled"})
                }else{
                    const enrollement = await prisma.course_enrollment.create({
                        data: {
                            course_id: Data.courseId,
                            userid: student.userid
                        }
                    })

                    const lessons = await prisma.lessons.findMany({
                        where: {
                            course_id: Data.courseId
                        }
                    })
                    
                    const lessonenrollmentdata= lessons.map((lesson) => ({
                        lesson_id: lesson.id,
                        user_id: student.userid,
                        course_id: Data.courseId

                    }))
                    
                    const lessonenrollment = await prisma.lesson_enrollment.createMany({
                        data: lessonenrollmentdata
                    })

                }

               
            }

    return NextResponse.json({ "message": "User enrolled Successfully"})
}



