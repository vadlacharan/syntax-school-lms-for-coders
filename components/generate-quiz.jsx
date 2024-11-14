"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for courses and lessons
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const difficultyLevels = ["Easy", "Medium", "Hard"];

export function GenerateQuizComponent() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState("");
  const [Loading, setLoading] = useState(false);


  useEffect(() => {
    const GetCourses = async () => {

      const courses = await fetch("/api/master/course", {
        method: "POST",
        "Content-Type": "application/json",
      })
        .then((response) => response.json())
        .then((response) => setCourses(response.courses));
    };

    console.log(selectedCourse);
    GetCourses();
  }, []);

  useEffect(() => {
    const GetLessons = async () => {
      const lessons = await fetch(`/api/master/lessons?id=${selectedCourse}`)
        .then((response) => response.json())
        .then((response) => setLessons(response.lessons));
    };
    GetLessons();
  }, [selectedCourse]);

  

  const handleGenerateQuiz =async () => {
    setLoading(true)
    
    const quiz = await fetch("/api/master/quiz",{
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({
        courseId: selectedCourse,
        lessonId: selectedLesson,
        difficultyLevel,
        numberOfQuestions,
        
        
      })
    })
    .then((response) => response.json())
    .then(response => {
      console.log(response.result.quiz)
      setGeneratedQuestions(response.result.quiz?.questions)
      setTitle(response.result.quiz?.title)
    })
    setLoading(false)
    
    
    
    
  };

  const handleSaveQuiz = async  () => {
    setLoading(true)
   
    const response = await fetch("/api/master/savequiz",{
      method:"POST",
      'Content-Type': "application/json",
      body: JSON.stringify({
      course: selectedCourse,
      lesson: selectedLesson,
      difficultyLevel,
      numberOfQuestions,
      questions: generatedQuestions,
      title: title

      })
    })
    .then(response => alert("Saved Quiz Successfully!"))

    setLoading(false)
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Generate Quiz with AI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course">Select Course</Label>
              <Select onValueChange={setSelectedCourse} value={selectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lesson">Select Lesson</Label>
              <Select
                onValueChange={setSelectedLesson}
                value={selectedLesson}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a lesson" />
                </SelectTrigger>
                <SelectContent>
                  {
                    lessons.map((lesson) => (
                      <SelectItem key={lesson.id} value={lesson.id}>
                        {lesson.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select
                onValueChange={setDifficultyLevel}
                value={difficultyLevel}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficultyLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="questionCount">Number of Questions</Label>
              <Input
                id="questionCount"
                type="number"
                min="1"
                max="20"
                value={numberOfQuestions}
                onChange={(e) =>
                  setNumberOfQuestions(parseInt(e.target.value, 10))
                }
              />
            </div>
          </div>
          <Button onClick={handleGenerateQuiz} disabled={Loading} className="w-full">
            Generate Quiz
          </Button>
          { (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Options</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {generatedQuestions?.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell>{q.question}</TableCell>
                    <TableCell>{q.options.join(", ")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGenerateQuiz}>
            Regenerate Quiz
          </Button>
          <Button
            onClick={handleSaveQuiz}
            disabled={Loading}
          >
            Save Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
