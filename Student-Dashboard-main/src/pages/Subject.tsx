import React from 'react'
import { BookOpen, Users, Clock } from 'lucide-react'
import { useAppSelector } from '../store/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/UI/card'
import { Progress } from '../components/UI/progress'
import { Badge } from '../components/UI/badge'

export const Subjects: React.FC = () => {
  const subjects = useAppSelector(state => state.subjects.subjects)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Subjects</h1>
        <p className="text-muted-foreground">
          Manage your enrolled subjects and track your progress.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <Card key={subject.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className={`w-4 h-4 rounded-full ${subject.color}`} />
                <Badge variant="outline">{subject.code}</Badge>
              </div>
              <CardTitle className="text-xl">{subject.name}</CardTitle>
              <CardDescription>
                Instructor: {subject.instructor}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{subject.credits} Credits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{subject.completedAssignments}/{subject.assignments} Done</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>

              <div className="pt-2">
                <div className="text-sm text-muted-foreground">
                  {subject.assignments - subject.completedAssignments} assignments remaining
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

