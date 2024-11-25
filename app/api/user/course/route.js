import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { CloudFog } from "lucide-react";
import { NextResponse } from "next/server";

export async function GET(req,res){

    const CourseId =    await parseInt(req.nextUrl.searchParams.get('id'))
    
    const user = await currentUser()

    const coursename = await prisma.course.findUnique({
        where:{
            id: CourseId
        },
        select: {
            title: true
        }
    })

    const enrollement = await prisma.course_enrollment.findMany({
        where:{
            userid: user.id,
            course_id: CourseId
        },
        include: {
            course: true
        }
    })
    

    if( enrollement.length){

        const lessons = await prisma.lesson_enrollment.findMany({
            where: {
                user_id: user.id,
                course_id: CourseId
                
            },
            include: {
                lessons: true,
              
            }
        })
        
        const LessonIds = lessons.map((lesson)=> lesson.lessons.id)
        
        const quizzes = await prisma.quiz.findMany({
            where: {
                lesson_id: {
                    in: LessonIds
                }
            }

        })

        const transformedData = {
            lessons: lessons.map(lesson => ({
              lesson: {
                title: lesson.lessons.title,
                quizzes: quizzes
                  .filter(quiz => quiz.lesson_id === lesson.lesson_id) // Match quizzes by lesson_id
                  .map(quiz => ({
                    quiz: { title: quiz.title || "Untitled Quiz" } // Handle null titles
                  }))
              }
            }))
          };
          
          



    
        return NextResponse.json({"lessons": transformedData, "coursename": coursename})

    }else{
        return NextResponse.json({status: 401})
    }

    
}


export async function POST(req,res){

    const user = await currentUser();

    const master = await prisma.user_roles.findUnique({ 
        where: {
            userid: user.id
        },
        select:{
            ismaster: true
        }
    })

    if (master.ismaster){

        const data =await  req.json();
        
        const course = await prisma.course.create({
            data: {
                title: data.title,
                author: user.id,
                nooflessons: data.numberOfLessons
            }
        })
        

        const lessons = data.lessontitles.map( title => ({
            title,
            course_id: course.id
        }))

        const lesson = await prisma.lessons.createMany({
            data: lessons
        })
    }else{
        return NextResponse.json({status: 401})
    }

    

    return NextResponse.json({"message": "Course Created Succesfully"})
}