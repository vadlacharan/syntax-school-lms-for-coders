import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export async function POST(req,res){
    const Data = await req.json()
    
    const details = await prisma.lessons.findFirst(
        {
            where: {
                id: Data.lessonId
            },
            include: {
                course: true
            }
        }
    )
    console.log(Data)
    console.log(details)
    const CourseTitle = details.course.title
    const lessonTitle = details.title

    const prompt = `generate quiz about course : ${CourseTitle} on lesson: ${lessonTitle} number of questions: ${Data.numberOfQuestions} and difficulty level: ${Data.difficultyLevel} in JSON format `
    console.log(prompt)
    let result = await model.generateContent(prompt);
    result = result.response.text()
    result= result.replace(/```json|```/g, '')
    result =  JSON.parse(result)


    return NextResponse.json({ "result" : result})
}