'use client';
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, CheckCircle, Code } from 'lucide-react'
import { useParams } from 'next/navigation';

export function BlockPage() {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams()

  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulated API delay
        const response = await fetchData(`api/user/course?id=${params.courseId}`)
        .then(response => response.json())
        .then(response => setCourseData(response))
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  

  return (
    (<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{courseData?.coursename?.title}</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={33} className="w-full" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">33% Complete</p>
          </CardContent>
        </Card>
        <div className="space-y-6">
          {courseData?.lessons?.lessons.map((lessonData, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>{lessonData.lesson.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Badge variant="secondary" className="mb-2">
                    {lessonData.lesson.quizzes.length} Quizzes
                  </Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Master the concepts with interactive quizzes
                  </p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="quizzes">
                    <AccordionTrigger>View Quizzes</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {lessonData.lesson.quizzes.map((quiz, quizIndex) => {
                          console.log(lessonData)(
                          
                          <Button key={quizIndex} variant="outline" className="w-full justify-start">
                            <Code className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span className="text-left">{quiz.title}</span>
                            {quizIndex === 0 && <CheckCircle className="ml-auto h-4 w-4 text-green-500 flex-shrink-0" />}
                          </Button>
                        )})}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>)
  );
}

function LoadingSkeleton() {
  return (
    (<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Skeleton className="h-9 w-64" />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-20" />
          </CardContent>
        </Card>
        <div className="space-y-6">
          {[1, 2].map((_, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>)
  );
}