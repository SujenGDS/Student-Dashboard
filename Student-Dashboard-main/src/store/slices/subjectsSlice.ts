import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Subject {
  id: string
  name: string
  code: string
  instructor: string
  credits: number
  color: string
  progress: number
  assignments: number
  completedAssignments: number
}

interface SubjectsState {
  subjects: Subject[]
  loading: boolean
  error: string | null
}

const initialState: SubjectsState = {
  subjects: [
    {
      id: '1',
      name: 'Web Development',
      code: 'CS301',
      instructor: 'Dr. Sarah Johnson',
      credits: 3,
      color: 'bg-blue-500',
      progress: 75,
      assignments: 8,
      completedAssignments: 6
    },
    {
      id: '2',
      name: 'Database Systems',
      code: 'CS302',
      instructor: 'Prof. Michael Chen',
      credits: 4,
      color: 'bg-green-500',
      progress: 60,
      assignments: 6,
      completedAssignments: 3
    },
    {
      id: '3',
      name: 'Data Structures',
      code: 'CS201',
      instructor: 'Dr. Emily Davis',
      credits: 3,
      color: 'bg-purple-500',
      progress: 90,
      assignments: 10,
      completedAssignments: 9
    },
    {
      id: '4',
      name: 'Mobile Development',
      code: 'CS401',
      instructor: 'Prof. James Wilson',
      credits: 3,
      color: 'bg-orange-500',
      progress: 45,
      assignments: 5,
      completedAssignments: 2
    }
  ],
  loading: false,
  error: null
}

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    updateSubjectProgress: (state, action: PayloadAction<{ id: string; progress: number }>) => {
      const subject = state.subjects.find(s => s.id === action.payload.id)
      if (subject) {
        subject.progress = action.payload.progress
      }
    },
    addSubject: (state, action: PayloadAction<Omit<Subject, 'id'>>) => {
      const newSubject: Subject = {
        ...action.payload,
        id: Date.now().toString()
      }
      state.subjects.push(newSubject)
    }
  }
})

export const { updateSubjectProgress, addSubject } = subjectsSlice.actions
export default subjectsSlice.reducer

