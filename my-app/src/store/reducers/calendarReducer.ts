import { getCurrTasks } from './../utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICalendar, TaskCalendarItemType } from './../../types/types'
import moment from 'moment'

const tasks: TaskCalendarItemType[] = [
  {
    id: 1,
    title: 'Task1',
    // description: 'Description1',
    // people: [],
    // date: moment('2023-03-06 15:30').toDate(),
    dateCreate: '2023-02-06 11:20',
  },
  {
    id: 2,
    title: 'Task2',
    // description: 'Description2',
    // people: [],
    // date: moment('2023-03-06 12:30').toDate(),
    dateCreate: '2023-02-07 17:00',
  },
  {
    id: 3,
    title: 'Task3',
    // description: 'Description3',
    // people: [],
    dateCreate: '2023-02-09 15:30',
  },
]

const today = new Date()
export const initialState: ICalendar = {
  dateCurrent: today.toDateString(),
  taskListAll: tasks,
  searchString: '',
  taskList: getCurrTasks(tasks, today),
  dateSelectedInPlan: today.toDateString(),
  taskListInPlan: getCurrTasks(tasks, today),
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.dateCurrent = action.payload
    },
    getCurrTasks: (state, action: PayloadAction<string>) => {
      state.taskList = getCurrTasks(state.taskListAll, moment(action.payload).toDate())
    },
    filterCurrTasks: (state, action: PayloadAction<string>) => {
      state.taskList = state.taskList.filter((task) =>
        task.title.toLowerCase().includes(action.payload.toLowerCase()),
      )
    },
    setDateSelectedInPlan: (state, action: PayloadAction<string>) => {
      state.dateSelectedInPlan = action.payload
    },
    getListInPlan: (state, action: PayloadAction<string>) => {
      state.taskListInPlan = getCurrTasks(tasks, new Date(state.dateSelectedInPlan))
    },
    createTask: (state, action: PayloadAction<string>) => {
      const newTask: TaskCalendarItemType = {
        dateCreate: state.dateCurrent,
        title: action.payload,
        id: Number(new Date()),
      }

      state.taskListAll.push(newTask)
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.taskListAll = state.taskListAll.filter((task) => task.id !== action.payload)
    },
  },
})
export const { setCurrentDate } = calendarSlice.actions
export const calendarActions = calendarSlice.actions
// export const dateCurrent=(state:RootState)
const calendarReducer = calendarSlice.reducer

export default calendarReducer
