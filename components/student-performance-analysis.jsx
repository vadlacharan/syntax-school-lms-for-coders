"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const coursePerformanceData = [
  { course: "Math", score: 85 },
  { course: "Science", score: 92 },
  { course: "History", score: 78 },
  { course: "English", score: 88 },
  { course: "Programming", score: 95 },
]

const quizScoresData = [
  { week: "Week 1", score: 7 },
  { week: "Week 2", score: 8 },
  { week: "Week 3", score: 9 },
  { week: "Week 4", score: 8 },
  { week: "Week 5", score: 10 },
]

const codingProgressData = [
  { month: "Jan", completedTasks: 5, totalTasks: 10 },
  { month: "Feb", completedTasks: 8, totalTasks: 12 },
  { month: "Mar", completedTasks: 12, totalTasks: 15 },
  { month: "Apr", completedTasks: 15, totalTasks: 18 },
  { month: "May", completedTasks: 20, totalTasks: 22 },
]

const timeSpentData = [
  { name: "Lectures", value: 35 },
  { name: "Assignments", value: 25 },
  { name: "Projects", value: 20 },
  { name: "Quizzes", value: 10 },
  { name: "Discussion", value: 10 },
]

export function StudentPerformanceAnalysisComponent() {
  return (
    (<div className="container mx-auto p-4">
      
      <h1 className="text-3xl font-bold mb-6">Student Performance Analysis</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="coding">Coding Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Overall Course Performance</CardTitle>
                <CardDescription>Average scores across all courses</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    score: {
                      label: "Score",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={coursePerformanceData}>
                      <XAxis dataKey="course" />
                      <YAxis />
                      <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Time Spent Distribution</CardTitle>
                <CardDescription>Breakdown of time spent on different activities</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Time Spent",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={timeSpentData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="var(--color-value)"
                        label />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Course Performance</CardTitle>
              <CardDescription>Individual scores for each course</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  score: {
                    label: "Score",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[400px]">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={coursePerformanceData}>
                    <XAxis dataKey="course" />
                    <YAxis />
                    <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="quizzes">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Performance Trend</CardTitle>
              <CardDescription>Weekly quiz scores over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  score: {
                    label: "Score",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[400px]">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={quizScoresData}>
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="var(--color-score)"
                      strokeWidth={2} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="coding">
          <Card>
            <CardHeader>
              <CardTitle>Coding Progress</CardTitle>
              <CardDescription>Monthly completed tasks vs total tasks</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  completedTasks: {
                    label: "Completed Tasks",
                    color: "hsl(var(--chart-5))",
                  },
                  totalTasks: {
                    label: "Total Tasks",
                    color: "hsl(var(--chart-6))",
                  },
                }}
                className="h-[400px]">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={codingProgressData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Bar
                      dataKey="completedTasks"
                      fill="var(--color-completedTasks)"
                      radius={[4, 4, 0, 0]} />
                    <Bar dataKey="totalTasks" fill="var(--color-totalTasks)" radius={[4, 4, 0, 0]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>)
  );
}