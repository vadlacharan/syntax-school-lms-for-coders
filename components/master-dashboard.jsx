'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, UserPlus, ClipboardList, BarChart2 } from 'lucide-react'
import { SignedIn, UserButton } from '@clerk/nextjs'

export function MasterDashboardComponent() {
  const dashboardItems = [
    {
      title: "Create Course",
      description: "Design and publish new courses",
      icon: <BookOpen className="h-8 w-8 mb-2" />,
      link: "/master/createcourse"
    },
    {
      title: "Generate Quiz",
      description: "Create AI-powered quizzes for your courses",
      icon: <FileText className="h-8 w-8 mb-2" />,
      link: "/master/generatequiz"
    },
    {
      title: "Enroll Students",
      description: "Manage student enrollments in courses",
      icon: <UserPlus className="h-8 w-8 mb-2" />,
      link: "/master/enrollstudent"
    },
    {
      title: "View Submissions",
      description: "Review and grade student submissions",
      icon: <ClipboardList className="h-8 w-8 mb-2" />,
      link: "/view-submissions"
    },
    {
      title: "Analytics",
      description: "View course and student performance metrics",
      icon: <BarChart2 className="h-8 w-8 mb-2" />,
      link: "/analytics"
    }
  ]

  return (
    (<div className="container mx-auto py-10">
       <SignedIn>
        <UserButton />
      </SignedIn>
      <h1 className="text-3xl font-bold mb-6">Master Dashboard</h1>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map((item, index) => (
          <Link href={item.link} key={index}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {item.icon}
                  <span>{item.title}</span>
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Click to access</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>)
  );
}