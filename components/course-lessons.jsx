'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { BookOpen, FileQuestion, Code, CheckCircle, BookOpenCheck } from "lucide-react"

// Mock data for course lessons
const courseLessons = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript programming",
    elements: [
      { type: "reading", title: "JavaScript Fundamentals", completed: true },
      { type: "quiz", title: "JavaScript Basics Quiz", completed: true },
      { type: "coding", title: "First JavaScript Program", completed: false },
    ],
    completed: false
  },
  {
    id: 2,
    title: "Working with Arrays",
    description: "Explore array methods and operations",
    elements: [
      { type: "reading", title: "Array Operations in JavaScript", completed: true },
      { type: "quiz", title: "Array Methods Quiz", completed: false },
      { type: "coding", title: "Array Manipulation Challenge", completed: false },
    ],
    completed: false
  },
  {
    id: 3,
    title: "Functions and Scope",
    description: "Understanding functions and variable scope",
    elements: [
      { type: "reading", title: "Functions in JavaScript", completed: false },
      { type: "quiz", title: "Function Types and Scope Quiz", completed: false },
      { type: "coding", title: "Function Implementation Exercise", completed: false },
    ],
    completed: false
  },
  {
    id: 4,
    title: "DOM Manipulation",
    description: "Interacting with the Document Object Model",
    elements: [
      { type: "reading", title: "Introduction to the DOM", completed: false },
      { type: "quiz", title: "DOM Methods and Properties Quiz", completed: false },
      { type: "coding", title: "Dynamic Webpage Creation", completed: false },
    ],
    completed: false
  }
]

export function CourseLessonsComponent() {
  const completedLessons = courseLessons.filter(lesson => lesson.completed).length
  const totalLessons = courseLessons.length
  const progressPercentage = (completedLessons / totalLessons) * 100

  return (
    (<div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">JavaScript Fundamentals Course</CardTitle>
            <CardDescription>Master the basics of JavaScript programming</CardDescription>
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
          {courseLessons.map((lesson, index) => (
            <AccordionItem
              value={`lesson-${lesson.id}`}
              key={lesson.id}
              className="border rounded-lg overflow-hidden">
              <AccordionTrigger
                className="px-6 py-4 bg-card hover:bg-accent hover:text-accent-foreground transition-colors">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-primary" />
                    <span className="font-semibold">Lesson {index + 1}: {lesson.title}</span>
                  </div>
                  {lesson.completed && (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-card">
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardTitle>{lesson.title}</CardTitle>
                    <CardDescription>{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {lesson.elements.map((element, elementIndex) => (
                      <div key={elementIndex} className="flex items-center justify-between">
                        <div className="flex items-center">
                          {element.type === 'reading' && <BookOpenCheck className="w-5 h-5 mr-2 text-primary" />}
                          {element.type === 'quiz' && <FileQuestion className="w-5 h-5 mr-2 text-primary" />}
                          {element.type === 'coding' && <Code className="w-5 h-5 mr-2 text-primary" />}
                          <span className="font-medium">{element.title}</span>
                        </div>
                        <Link href={`/${element.type}/${lesson.id}/${elementIndex}`} passHref>
                          <Button variant="outline" size="sm">
                            {element.completed ? 'Review' : 'Start'}
                          </Button>
                        </Link>
                      </div>
                    ))}
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