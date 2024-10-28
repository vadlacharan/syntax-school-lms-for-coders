'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle } from "lucide-react"

// Mock quiz data
const quizData = {
  title: "JavaScript Fundamentals Quiz",
  description: "Test your knowledge of JavaScript basics",
  questions: [
    {
      id: 1,
      question: "What is the correct way to declare a variable in JavaScript?",
      options: [
        { id: 'a', text: 'var x = 5;' },
        { id: 'b', text: 'let x = 5;' },
        { id: 'c', text: 'const x = 5;' },
        { id: 'd', text: 'All of the above' },
      ],
      correctAnswer: 'd'
    },
    {
      id: 2,
      question: "Which of the following is not a JavaScript data type?",
      options: [
        { id: 'a', text: 'Number' },
        { id: 'b', text: 'String' },
        { id: 'c', text: 'Boolean' },
        { id: 'd', text: 'Float' },
      ],
      correctAnswer: 'd'
    },
    {
      id: 3,
      question: "What does the '===' operator do in JavaScript?",
      options: [
        { id: 'a', text: 'Assigns a value' },
        { id: 'b', text: 'Compares values and types' },
        { id: 'c', text: 'Compares only values' },
        { id: 'd', text: 'Logical AND operation' },
      ],
      correctAnswer: 'b'
    },
    {
      id: 4,
      question: "Which method is used to add elements to the end of an array?",
      options: [
        { id: 'a', text: 'push()' },
        { id: 'b', text: 'pop()' },
        { id: 'c', text: 'unshift()' },
        { id: 'd', text: 'shift()' },
      ],
      correctAnswer: 'a'
    },
  ]
}

export function QuizPageComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (questionId, answerId) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }))
  }

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    let score = 0
    quizData.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        score++
      }
    })
    return score
  }

  const progressPercentage = ((currentQuestion + 1) / quizData.questions.length) * 100

  return (
    (<div className="min-h-screen bg-background text-foreground py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{quizData.title}</CardTitle>
            <CardDescription>{quizData.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {!showResults ? (
              <>
                <div className="mb-4">
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>Question {currentQuestion + 1} of {quizData.questions.length}</span>
                    <span>{Math.round(progressPercentage)}% Complete</span>
                  </div>
                  <Progress value={progressPercentage} className="w-full" />
                </div>
                <h2 className="text-xl font-semibold mb-4">{quizData.questions[currentQuestion].question}</h2>
                <RadioGroup
                  onValueChange={(value) => handleAnswer(quizData.questions[currentQuestion].id, value)}
                  value={answers[quizData.questions[currentQuestion].id]}>
                  {quizData.questions[currentQuestion].options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                      <Label htmlFor={`option-${option.id}`}>{option.text}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </>
            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-4">Quiz Results</h2>
                <p className="text-lg mb-4">You scored {calculateScore()} out of {quizData.questions.length}</p>
                {quizData.questions.map((question, index) => (
                  <div key={question.id} className="mb-4">
                    <p className="font-medium">{index + 1}. {question.question}</p>
                    <p className="flex items-center mt-1">
                      {answers[question.id] === question.correctAnswer ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mr-2" />
                      )}
                      Your answer: {question.options.find(opt => opt.id === answers[question.id])?.text}
                    </p>
                    {answers[question.id] !== question.correctAnswer && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        Correct answer: {question.options.find(opt => opt.id === question.correctAnswer)?.text}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            {!showResults ? (
              <Button onClick={handleNext} className="w-full">
                {currentQuestion < quizData.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            ) : (
              <Button onClick={() => window.location.reload()} className="w-full">Retake Quiz</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>)
  );
}