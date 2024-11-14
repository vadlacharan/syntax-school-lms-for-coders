'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { BookOpen, FileQuestion, Code, CheckCircle, BookOpenCheck } from "lucide-react"
import { useParams } from 'next/navigation'

export function CourseLessonsComponent() {
 

  const [status, setStatus] = useState(300)
  const params  = useParams()
  const [Lessons, setLessons] = useState([])
  const [quizzes, setQuizzes] = useState([])

  
  const completedLessons = Lessons?.filter(Lesson => Lesson.iscompleted).length
  const totalLessons = Lessons?.length
  const progressPercentage = (completedLessons / totalLessons) * 100

  useEffect( () =>  {
    const FetchCourse = async () => {

      const course = await fetch(`/api/user/course?id=${params.courseid}`)
      .then( response => response.json())
      setLessons(course.lessons)
      setStatus(course?.status)
      setQuizzes(course.quizzes)

      console.log(course)
      
    }
     FetchCourse()



  },[])

  return (
    status==401?<p>You are not enrolled for this Course</p>:status==300?<p>Loading...</p>:
    (<div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{Lessons[0]?.course.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Course Progress</span>
              <span className="text-sm font-medium">{completedLessons}/{totalLessons} Lessons</span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
          </CardContent>
        </Card>
        
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          
          {Lessons.map((lesson, index) => (
           
            <AccordionItem
              value={`lesson-${lesson.id}`}
              key={lesson.id}
              className="border rounded-lg overflow-hidden">
              <AccordionTrigger
                className="px-6 py-4 bg-card hover:bg-accent hover:text-accent-foreground transition-colors">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-primary" />
                    <span className="font-semibold">Lesson {index + 1}: {lesson.lessons.title}</span>
                  </div>

                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-card">
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardTitle>{lesson.lessons.title}</CardTitle>
                  </CardHeader>
                    
                   <CardContent className="space-y-4">
                    
                    {/* {
                      
                    lesson.elements.map((element, elementIndex) => (
                      <div key={elementIndex} className="flex items-center justify-between">
                        <div className="flex items-center">
                          {element.type === 'quiz' && <FileQuestion className="w-5 h-5 mr-2 text-primary" />}
                          <span className="font-medium">{element.title}</span>
                        </div>
                        <Link href={`/${element.type}/${lesson.id}/${elementIndex}`} passHref>
                          <Button variant="outline" size="sm">
                            {element.completed ? 'Review' : 'Start'}
                          </Button>
                        </Link>
                      </div>
                    ))} */}
                  </CardContent> 



                  
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>)
  );
}