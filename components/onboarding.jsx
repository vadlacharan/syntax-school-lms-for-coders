'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { GraduationCap, BookOpen, ChevronRight } from "lucide-react"
import { useRouter } from 'next/navigation'
import * as React from "react"



export function Onboarding({ setProgress }) {
  const router = useRouter()
  const [userType, setUserType] = useState()
  const [error, setError]= useState("")
  const [button,setButton] = useState(false)
  const  handleSubmit = async (e) => {
    e.preventDefault()

    setButton(true)
    const Data = {
      key : userType
    }

    if( userType){

      const response = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Data), 
      }).then(response => response.json()).then(response => { setError(response.error)})

      router.push("/")
    }

    
  }

  return (
    (<div
      className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome to CodeMaster LMS</CardTitle>
          <CardDescription>Let's set up your account. Are you a student or an instructor?</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            
            <RadioGroup
              onValueChange={(value) => setUserType(value)}
              className="grid grid-cols-2 gap-4">
              <Label
                htmlFor="student"
                className={`flex flex-col items-center justify-center border rounded-lg p-4 cursor-pointer transition-colors ${
                  userType === 'student' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}>
                <RadioGroupItem value="student" id="student" className="sr-only" />
                <GraduationCap className="w-12 h-12 mb-2" />
                <span className="text-lg font-medium">Student</span>
              </Label>
              <Label
                htmlFor="master"
                className={`flex flex-col items-center justify-center border rounded-lg p-4 cursor-pointer transition-colors ${
                  userType === 'master' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}>
                <RadioGroupItem value="master" id="master" className="sr-only" />
                <BookOpen className="w-12 h-12 mb-2" />
                <span className="text-lg font-medium">Instructor</span>
              </Label>
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full"  disabled={!userType || button}>
              Continue to Dashboard
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
                <br></br>
               
          </CardFooter>

          <p>{error}</p>
        </form>
      </Card>
    </div>)
  );
}