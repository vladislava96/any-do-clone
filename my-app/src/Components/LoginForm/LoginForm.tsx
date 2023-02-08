import { Tab, Tabs } from '@mui/material'
// import { useDispatch } from 'react-redux';
// import { loginSlice } from '../../store/reducers/loginSlice';
import { DialogForm } from '../../types/enum'
import { DialogModal } from '../UI/DialogModal'
import { LoginView } from './LoginView'
import { SyntheticEvent } from 'react'
import { RegistrationView } from './RegistrationView'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { hideDialog, selectDialogForm } from '../../store/reducers/authorization'
import TaskForm from '../taskForm/taskForm'

const formsParams = {
  [DialogForm.login]: {
    textApprove: 'Войти',
    formId: `form-${DialogForm.login}`,
  },
  [DialogForm.register]: {
    textApprove: 'Зарегистрироваться',
    formId: `form-${DialogForm.register}`,
  },
  [DialogForm.task]: {
    textApprove: 'Добавить задачу',
    formId: `form-${DialogForm.task}`,
  },
}

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const {isDialogShown, dialogForm: currentDialogForm} = useAppSelector(state => state.authorization);

  const dialogForm: DialogForm = currentDialogForm ?? DialogForm.login;
  const formParams = formsParams[dialogForm];
  const formId = formParams.formId;

  const handleChange = (e: SyntheticEvent, newValue: DialogForm) => {
    dispatch(selectDialogForm(newValue))
  }

  return (
    <DialogModal
      onClose={() => dispatch(hideDialog())}
      isOpen={isDialogShown}
      formsParams={formParams}
    >
      <Tabs onChange={handleChange} value={dialogForm}>
        <Tab label='Войти' value={DialogForm.login} />
        <Tab label='Зарегистрироваться' value={DialogForm.register} />
      </Tabs>

      {!(dialogForm === DialogForm.login ? (
        <LoginView formId={formId} />
      ) : (
        <RegistrationView formId={formId} />
      ) ) ? <TaskForm formId={formId} /> : null}
    </DialogModal>
  )
}
