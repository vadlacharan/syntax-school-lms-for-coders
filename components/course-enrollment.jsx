"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from 'lucide-react'

// Mock data for courses and students

const students = [
  { id: '1', username: 'john_doe' },
  { id: '2', username: 'jane_smith' },
  { id: '3', username: 'bob_johnson' },
]

// Mock initial enrollments
const initialEnrollments = [
  { id: '1', courseId: '1', studentId: '1' },
  { id: '2', courseId: '2', studentId: '2' },
  { id: '3', courseId: '1', studentId: '3' },
]

export function CourseEnrollmentComponent() {
  const [enrollments, setEnrollments] = useState(initialEnrollments)
  const [selectedCourse, setSelectedCourse] = useState('')
  const [newStudentUsername, setNewStudentUsername] = useState('')
  const [filterCourse, setFilterCourse] = useState('')
  const [filterStudent, setFilterStudent] = useState('')
  const [appliedFilterCourse, setAppliedFilterCourse] = useState('')
  const [appliedFilterStudent, setAppliedFilterStudent] = useState('')
  const [courses, setCourses] = useState([])
  const [Loading, setLoading]=useState(false)

  useEffect(() =>{

    const GetCourses = async () => {
      const response = await fetch('/api/master/course',{
        method: 'POST',
        'Content-Type': 'application/json'
      })
      .then(response => response.json())
      .then( response => setCourses(response?.courses))
    
    }
    GetCourses()
  },[])


  const handleEnroll = async () => {


    setLoading(true)
      if (student) {
        const newEnrollmentData = {
          courseId: selectedCourse,
          username: newStudentUsername,
        }

        const newEnrollment = await fetch('/api/user/enrolledcourses',{
          method: 'POST',
          'Content-Type': 'application/json',
          body: JSON.stringify(newEnrollmentData)})
          .then( response => response.json())
          .then(response => alert(response.message))
        setEnrollments([...enrollments, newEnrollmentData])
        setNewStudentUsername('')
      } else {
        alert('Student not found')
      }
      setLoading(false)
  }

  const handleDeleteEnrollment = (enrollmentId) => {
    setEnrollments(enrollments.filter(e => e.id !== enrollmentId))
  }

  const handleApplyFilter = () => {
    setAppliedFilterCourse(filterCourse)
    setAppliedFilterStudent(filterStudent)
  }

  const filteredEnrollments = enrollments.filter(enrollment => 
    (!appliedFilterCourse || enrollment.courseId === appliedFilterCourse) &&
    (!appliedFilterStudent || 
      students.find(s => s.id === enrollment.studentId)?.username.toLowerCase().includes(appliedFilterStudent.toLowerCase())))

  return (
    (<div className="container mx-auto py-10">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Course Enrollment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="course">Select Course</Label>
              <Select onValueChange={setSelectedCourse} value={selectedCourse}>
                <SelectTrigger>
                  <SelectValue  />
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
            <div>
              <Label htmlFor="student">Student Username</Label>
              <Input
                id="student"
                value={newStudentUsername}
                onChange={(e) => setNewStudentUsername(e.target.value)}
                placeholder="Enter student username" />
            </div>
            <div className="flex items-end">
              <Button onClick={handleEnroll} className="w-full" disabled={Loading}> Enroll Student</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="filterCourse">Filter by Course</Label>
              <Select onValueChange={setFilterCourse} value={filterCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"All courses"}>All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filterStudent">Filter by Student Username</Label>
              <Input
                id="filterStudent"
                value={filterStudent}
                onChange={(e) => setFilterStudent(e.target.value)}
                placeholder="Enter student username" />
            </div>
            <div className="flex items-end">
              <Button onClick={handleApplyFilter} className="w-full">Apply Filters</Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell>
                    {courses.find(c => c.id === enrollment.courseId)?.title}
                  </TableCell>
                  <TableCell>
                    {students.find(s => s.id === enrollment.studentId)?.username}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteEnrollment(enrollment.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>)
  );
}