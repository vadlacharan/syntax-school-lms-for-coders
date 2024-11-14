import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req,res){
    const { course, lesson, difficultyLevel, numberOfQuestions, questions,title} = await req.json()

    const quiz = await prisma.quiz.create({
        data:{
            lesson_id: lesson,
            questions: numberOfQuestions,
            title:title
        

        }
    })

    const questionsData= questions.map((question)=> ({
        value: question.question,
        quiz_id: quiz.id,
        opt1: question.options[0],
        opt2:question.options[1],
        opt3: question.options[2],
        opt4: question.options[3],
        answer: question.answer

        
    }))
    
    
    const savedQuestions = await prisma.quiz_question.createManyAndReturn({
        data: questionsData
    })
    
    return NextResponse.json({"message": "Quiz Saved Successfully"})
}