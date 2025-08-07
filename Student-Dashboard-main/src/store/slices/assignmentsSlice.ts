import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Assignment {
  id: string
  title: string
  description: string
  subject: string
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  progress: number
}

interface AssignmentsState {
  assignments: Assignment[]
  loading: boolean
  error: string | null
}

const initialState: AssignmentsState = {
  assignments: [
    {
      id: '1',
      title: 'React Components Project',
      description: 'Build a component library using React and TypeScript',
      subject: 'Web Development',
      dueDate: '2024-02-15',
      status: 'in-progress',
      priority: 'high',
      progress: 65
    },
    {
      id: '2',
      title: 'Database Design Assignment',
      description: 'Design a normalized database schema for an e-commerce system',
      subject: 'Database Systems',
      dueDate: '2024-02-20',
      status: 'pending',
      priority: 'medium',
      progress: 0
    },
    {
      id: '3',
      title: 'Algorithm Analysis Report',
      description: 'Analyze time complexity of sorting algorithms',
      subject: 'Data Structures',
      dueDate: '2024-02-10',
      status: 'completed',
      priority: 'low',
      progress: 100
    },
    {
      id: '4',
      title: 'Mobile App Prototype',
      description: 'Create a mobile app prototype using React Native',
      subject: 'Mobile Development',
      dueDate: '2024-02-25',
      status: 'pending',
      priority: 'high',
      progress: 0
    }
  ],
  loading: false,
  error: null
}

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    updateAssignmentStatus: (state, action: PayloadAction<{ id: string; status: Assignment['status'] }>) => {
      const assignment = state.assignments.find(a => a.id === action.payload.id)
      if (assignment) {
        assignment.status = action.payload.status
        if (action.payload.status === 'completed') {
          assignment.progress = 100
        } else if (action.payload.status === 'pending') {
          assignment.progress = 0
        }
      }
    },
    updateAssignmentProgress: (state, action: PayloadAction<{ id: string; progress: number }>) => {
      const assignment = state.assignments.find(a => a.id === action.payload.id)
      if (assignment) {
        assignment.progress = action.payload.progress
        if (action.payload.progress === 100) {
          assignment.status = 'completed'
        } else if (action.payload.progress > 0) {
          assignment.status = 'in-progress'
        } else {
          assignment.status = 'pending'
        }
      }
    },
    addAssignment: (state, action: PayloadAction<Omit<Assignment, 'id'>>) => {
      const newAssignment: Assignment = {
        ...action.payload,
        id: Date.now().toString()
      }
      state.assignments.push(newAssignment)
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(a => a.id !== action.payload)
    }
  }
})

export const { 
  updateAssignmentStatus, 
  updateAssignmentProgress, 
  addAssignment, 
  deleteAssignment 
} = assignmentsSlice.actions

export default assignmentsSlice.reducer

