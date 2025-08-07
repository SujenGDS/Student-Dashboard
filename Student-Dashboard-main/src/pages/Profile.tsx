import React from 'react'
import { Mail, BookOpen, Calendar, Award } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useAppSelector } from '../store/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/UI/card'
import { Avatar, AvatarFallback, AvatarImage } from '../components/UI/avatar'
import { Badge } from '../components/UI/badge'
import { Progress } from '../components/UI/progress'

export const Profile: React.FC = () => {
  const { user } = useAuth()
  const assignments = useAppSelector(state => state.assignments.assignments)
  const subjects = useAppSelector(state => state.subjects.subjects)

  const completedAssignments = assignments.filter(a => a.status === 'completed').length
  const totalAssignments = assignments.length
  const completionRate = Math.round((completedAssignments / totalAssignments) * 100)

  const averageProgress = Math.round(
    subjects.reduce((acc, subject) => acc + subject.progress, 0) / subjects.length
  )

  const totalCredits = subjects.reduce((acc, subject) => acc + subject.credits, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account and view your academic progress.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Info */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback className="text-2xl">
                {user?.name?.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{user?.name}</CardTitle>
            <CardDescription>{user?.course} • {user?.year}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{subjects.length} Subjects Enrolled</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{totalCredits} Total Credits</span>
            </div>
          </CardContent>
        </Card>

        {/* Academic Stats */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
              <CardDescription>
                Your overall progress and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{completionRate}%</div>
                  <div className="text-sm text-muted-foreground">Assignment Completion</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{averageProgress}%</div>
                  <div className="text-sm text-muted-foreground">Average Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{subjects.length}</div>
                  <div className="text-sm text-muted-foreground">Active Subjects</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Subject Progress</h4>
                {subjects.map((subject) => (
                  <div key={subject.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                        <span className="text-sm font-medium">{subject.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {subject.code}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {subject.progress}%
                      </span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Achievements</span>
              </CardTitle>
              <CardDescription>
                Your academic milestones and accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">First Assignment</div>
                    <div className="text-sm text-muted-foreground">Completed your first assignment</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="font-medium">High Achiever</div>
                    <div className="text-sm text-muted-foreground">Maintained 80%+ average</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
