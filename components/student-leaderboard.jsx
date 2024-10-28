"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Medal, Trophy, Award } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mock data for leaderboard
const leaderboardData = [
  { id: 1, username: "alex_smart", score: 9850, avatar: "/avatars/01.png" },
  { id: 2, username: "emma_genius", score: 9720, avatar: "/avatars/02.png" },
  { id: 3, username: "sam_brilliant", score: 9680, avatar: "/avatars/03.png" },
  { id: 4, username: "olivia_sharp", score: 9550, avatar: "/avatars/04.png" },
  { id: 5, username: "noah_clever", score: 9430, avatar: "/avatars/05.png" },
  { id: 6, username: "sophia_bright", score: 9320, avatar: "/avatars/06.png" },
  { id: 7, username: "liam_wise", score: 9210, avatar: "/avatars/07.png" },
  { id: 8, username: "ava_intelligent", score: 9100, avatar: "/avatars/08.png" },
  { id: 9, username: "mason_smart", score: 8990, avatar: "/avatars/09.png" },
  { id: 10, username: "isabella_brilliant", score: 8880, avatar: "/avatars/10.png" },
]

const RankIcon = ({
  rank
}) => {
  if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
  if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
  return <span className="font-bold text-muted-foreground">{rank}</span>;
}

export  function StudentLeaderboardComponent() {
  return (
    (<div className="container mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Student Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}>
                    <TableCell className="font-medium">
                      <RankIcon rank={index + 1} />
                    </TableCell>
                    <TableCell>
                      <Link href={`/profile/${student.username}`} className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={student.avatar} alt={student.username} />
                          <AvatarFallback>{student.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium hover:underline">{student.username}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">{student.score.toLocaleString()}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>)
  );
}