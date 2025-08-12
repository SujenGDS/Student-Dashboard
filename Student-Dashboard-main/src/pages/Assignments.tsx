import React from 'react'
import { Calendar, Clock, AlertCircle } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { updateAssignmentStatus, updateAssignmentProgress } from '../store/slices/assignmentsSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/UI/card'
import { Progress } from '../components/UI/progress'
import { Badge } from '../components/UI/badge'
import { Button } from '../components/UI/button'

export const Assignments: React.FC = () => {
  const assignments = useAppSelector(state => state.assignments.assignments)
  const dispatch = useAppDispatch()

  const handleStatusChange = (id: string, status: 'pending' | 'in-progress' | 'completed') => {
    dispatch(updateAssignmentStatus({ id, status }))
  }

  const handleProgressChange = (id: string, progress: number) => {
    dispatch(updateAssignmentProgress({ id, progress }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'in-progress':
        return 'warning'
      default:
        return 'secondary'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive'
      case 'medium':
        return 'warning'
      default:
        return 'secondary'
    }
  }

  const sortedAssignments = [...assignments].sort((a, b) => {
    if (a.status === 'completed' && b.status !== 'completed') return 1
    if (a.status !== 'completed' && b.status === 'completed') return -1
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Assignments</h1>
        <p className="text-muted-foreground">
          Track and manage your assignments across all subjects.
        </p>
      </div>

      <div className="space-y-4">
        {sortedAssignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{assignment.title}</CardTitle>
                  <CardDescription>{assignment.description}</CardDescription>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{assignment.subject}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getPriorityColor(assignment.priority) as any}>
                    {assignment.priority}
                  </Badge>
                  <Badge variant={getStatusColor(assignment.status) as any}>
                    {assignment.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{assignment.progress}%</span>
                </div>
                <Progress value={assignment.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {new Date(assignment.dueDate) < new Date() && assignment.status !== 'completed' && (
                    <div className="flex items-center space-x-1 text-destructive text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>Overdue</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {assignment.status !== 'completed' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleProgressChange(assignment.id, Math.min(assignment.progress + 25, 100))}
                      >
                        +25% Progress
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(assignment.id, 'in-progress')}
                        disabled={assignment.status === 'in-progress'}
                      >
                        Start Working
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(assignment.id, 'completed')}
                      >
                        Mark Complete
                      </Button>
                    </>
                  )}
                  {assignment.status === 'completed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(assignment.id, 'in-progress')}
                    >
                      Reopen
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

