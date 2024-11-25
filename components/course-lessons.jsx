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
  const [coursename, setCoursename] = useState("")

  
  const completedLessons = Lessons?.filter(Lesson => Lesson.iscompleted).length
  const totalLessons = Lessons?.length
  const progressPercentage = (completedLessons / totalLessons) * 100

  useEffect( () =>  {
    const FetchCourse = async () => {

      const course = await fetch(`/api/user/course?id=${params.courseid}`)
      .then( response => response.json())
      .then(response  => console.log(response))
      
    }
     FetchCourse()
    


  },[])

  return (

   <></>
  );
}