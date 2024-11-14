'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, BookOpen, BarChart3 } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs"
import { useEffect } from "react"
import { useRouter } from "next/navigation"




export function LandingPageComponent() {
  const router= useRouter()
  useEffect(() => {

   const FetchUserType = async () => {
      const user = await fetch('/api/user/onboarding')
      .then(response =>  response.json())
      .then( response => {
        router.push(response.path)})

    } 
    FetchUserType()


  },[])


  return (
    (<div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">Syntax School</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#">
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#">
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#">
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#">
            Contact
          </Link>
          <ModeToggle />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Master Programming with Syntax School
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Elevate your coding skills with our cutting-edge Learning Management System designed specifically for programmers.
                </p>
              </div>
              <div className="space-x-4">
              
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code2 className="w-6 h-6 mr-2 text-primary" />
                    CodeGround
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    An immersive coding assessment environment where you can practice, test, and refine your programming skills in real-time.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-primary" />
                    Master Mode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Advanced course management and tutoring system to help you organize your learning path and get expert guidance.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-6 h-6 mr-2 text-primary" />
                    Performatrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Comprehensive student progress analysis tools to track your growth, identify areas for improvement, and celebrate your achievements.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div
              className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Start Your Coding Journey?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Join CodeMaster LMS today and take your programming skills to the next level.
                </p>
              </div>
               <SignedOut>
               <SignInButton />
               </SignedOut>
              
            </div>
          </div>
        </section>
      </main>
      <footer
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2023 CodeMaster LMS. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>)
  );
}