"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Code2, Bell, BookOpen, User, LogOut } from "lucide-react"

import { SignedIn, UserButton } from '@clerk/nextjs'
// Mock data for enrolled courses

export default function UserDashboard() {
  const [activeNavItem, setActiveNavItem] = useState('dashboard')
  const [ enrolledcourses, setEnrolledCourses] = useState([])
  const [Loading, setLoading] = useState(true)

  useEffect( () => {
    
    const fetchData = async () => {
      setLoading(true)
      const response = await fetch('/api/user/enrolledcourses')
      .then( response => response.json())
      .then( response => setEnrolledCourses(response.enrolledcourses))
      

    }
    fetchData()
    setLoading(false)
    
    
    

  },[])

  return (
    (<div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">Syntax School</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Button
            variant={activeNavItem === 'dashboard' ? "default" : "ghost"}
            className="text-sm font-medium"
            onClick={() => setActiveNavItem('dashboard')}>
            Dashboard
          </Button>
        
          <Button
            variant={activeNavItem === 'performetrics' ? "default" : "ghost"}
            className="text-sm font-medium"
            onClick={() => setActiveNavItem('performetrics')}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Performetrics
          </Button>
          <Button
            variant={activeNavItem === 'codeground' ? "default" : "ghost"}
            className="text-sm font-medium"
            onClick={() => setActiveNavItem('codeground')}>
            <Code2 className="w-4 h-4 mr-2" />
            CodeGround
          </Button>
          <Button
            variant={activeNavItem === 'announcements' ? "default" : "ghost"}
            className="text-sm font-medium"
            onClick={() => setActiveNavItem('announcements')}>
            <Bell className="w-4 h-4 mr-2" />
            Leaderboard
          </Button>
         <SignedIn>
            <UserButton />
         </SignedIn>
        </nav>
      </header>

      <main className="flex-1 py-6 px-4 md:px-6">

        <h1 className="text-2xl font-bold mb-6">Welcome back</h1>
        <section>
          <h2 className="text-xl font-semibold mb-4">Your Enrolled Courses</h2>
        
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            
            {enrolledcourses.map((enrolledcourse) => (

              Loading?<p>Loading Course...</p>:
              <Card key={enrolledcourse.course.id}>
                <CardHeader>
                  <CardTitle>{enrolledcourse.course.title}</CardTitle>
                  <CardDescription>
                    Progress: {enrolledcourse.progress}%
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-2 bg-muted rounded-full mb-2">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${enrolledcourse.progress}%` }} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {enrolledcourse.lessons_completed} of {enrolledcourse.course.lessons} lessons completed
                  </p>
                </CardContent>
                <CardFooter>
                <Link href={`course/${enrolledcourse.course.id}`}>
                  <Button className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <footer className="py-6 px-4 md:px-6 border-t">
        <p className="text-xs text-center text-muted-foreground">
          © Syntax School LMS. All rights reserved.
        </p>
      </footer>
    </div>)
  );
}