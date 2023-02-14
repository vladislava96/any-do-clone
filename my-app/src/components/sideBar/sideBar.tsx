import styles from './sideBar.module.scss'
import 'moment/locale/ru'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Paper,
  Badge,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { NavLink } from 'react-router-dom'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import moment from 'moment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TextField from '@mui/material/TextField'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setCurrDate } from '../../store/actions/actionCalenda'
import { PickersDay } from '@mui/x-date-pickers'
const CustomBar = () => {
  const { taskList } = useAppSelector((state) => state.calendar)
  return (
    <>
      <p>
        Выбранная дата: <b> {moment(new Date()).format('Do MMMM YYYY')}</b>
      </p>
      <p>
        Количество задач: <strong>{taskList.length}</strong>
      </p>
    </>
  )
}
const SideBar = () => {
  const { dateCurrent } = useAppSelector((state) => state.calendar)
  const { taskListAll } = useAppSelector((state) => state.calendar)
  const dispatch = useAppDispatch()
  const changeDate = (date: string | null) => {
    if (date) {
      dispatch(setCurrDate(moment(date).format('YYYY-MM-DD HH:mm')))
    }
  }

  return (
    <div className={styles.sidebar}>
      <Paper>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='ru'>
          <StaticDatePicker
            displayStaticWrapperAs='desktop'
            value={dateCurrent}
            onChange={changeDate}
            renderInput={(params) => <TextField {...params} />}
            components={{
              ActionBar: CustomBar,
            }}
            renderDay={(day, _value, DayComponentProps) => {
              const isSelected = taskListAll
                .map((task) => task.dateCreate)
                .some((x) => moment(day).isSame(x, 'day'))

              return (
                <Badge
                  key={day.toString()}
                  overlap='circular'
                  color='primary'
                  badgeContent={isSelected ? '' : undefined}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  sx={{
                    '& .MuiBadge-badge': {
                      right: '50%',
                      height: '2px',
                      width: '1px',
                    },
                  }}
                >
                  <PickersDay {...DayComponentProps} />
                </Badge>
              )
            }}
          />
        </LocalizationProvider>
      </Paper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Мои проекты</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NavLink to='/main' className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <Typography>Все проекты</Typography>
          </NavLink>

          <Typography>Здоровье</Typography>
          <Typography>Бизнес</Typography>
          <Typography>Семья</Typography>
          <Typography>Путешествия</Typography>
          <Typography>Хобби</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>Мои доски</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NavLink to='/board' className={({ isActive }) => (isActive ? styles.activeLink : '')}>
            <Typography>Мои доски</Typography>
          </NavLink>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default SideBar
