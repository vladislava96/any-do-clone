import calendarReducer from './calendarReducer'
import { combineReducers } from 'redux'
import authorizationReducer from './authorization'
import { columnReducer } from './columnReducer'
import loginSlice from './loginSlice'
import { taskReducer } from './taskReducer'
import projectReducer from './projectReducer'
import { langReducer, techReducer } from './techReducer'

export default combineReducers({
  authorization: authorizationReducer,
  login: loginSlice,
  column: columnReducer,
  calendar: calendarReducer,
  project: projectReducer,
  task: taskReducer,
  currentId: techReducer,
  lang: langReducer,
})
