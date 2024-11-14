"use client"

import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CourseCreationComponent() {
  const { theme, setTheme } = useTheme()
  const [courseTitle, setCourseTitle] = useState("")
  const [courseDescription, setCourseDescription] = useState("")
  const [numberOfLessons, setNumberOfLessons] = useState(1)
  const [lessonTitles, setLessonTitles] = useState([""])
  const [Loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleNumberOfLessonsChange = (value) => {
    const num = parseInt(value, 10)
    setNumberOfLessons(num)
    setLessonTitles(prevTitles => {
      const newTitles = [...prevTitles]
      if (num > prevTitles.length) {
        for (let i = prevTitles.length; i < num; i++) {
          newTitles.push("")
        }
      } else if (num < prevTitles.length) {
        newTitles.splice(num)
      }
      return newTitles
    })
  }

  const handleLessonTitleChange = (index, title) => {
    setLessonTitles(prevTitles => {
      const newTitles = [...prevTitles]
      newTitles[index] = title
      return newTitles
    })
  }

  const handleSaveCourse = async () => {
    // Here you would typically send the data to your backend
    setLoading(true)

    const savecourse = await fetch('/api/user/course',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: courseTitle,
        numberOfLessons:  numberOfLessons,
        lessontitles: lessonTitles
      })
    })
    .then(response => response.json())
    .then(response => setMessage(response.message))
    
    setLoading(false)


    
  
  }

  return (
    (<div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Course</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="courseTitle">Course Title</Label>
            <Input
              id="courseTitle"
              placeholder="Enter course title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="courseDescription">Course Description</Label>
            <Textarea
              id="courseDescription"
              placeholder="Enter course description"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numberOfLessons">Number of Lessons</Label>
            <Select onValueChange={handleNumberOfLessonsChange} defaultValue="1">
              <SelectTrigger>
                <SelectValue placeholder="Select number of lessons" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {lessonTitles.map((title, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`lessonTitle${index}`}>Lesson {index + 1} Title</Label>
              <Input
                id={`lessonTitle${index}`}
                placeholder={`Enter title for Lesson ${index + 1}`}
                value={title}
                onChange={(e) => handleLessonTitleChange(index, e.target.value)} />
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <p>{message}</p>
          </div>
          <Button onClick={handleSaveCourse} disabled={ Loading }>Save Course</Button>
        </CardFooter>
      </Card>
    </div>)
  );
}