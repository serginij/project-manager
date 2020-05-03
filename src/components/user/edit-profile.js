import React, { useReducer, useState, useEffect } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'
import jwt_decode from 'jwt-decode'

import { Input, AddButton, Button, CloseButton, Alert } from '@ui'
import { updateUser, updatePassword, updateEmail } from '@symbiotes/effects/'
import { history } from '@lib/routing'

const initialState = {
  name: {
    value: '',
    label: 'Имя',
    error: false,
    pattern: '',
    message: 'Введите имя',
    type: 'text',
    autocomplete: 'off'
  },
  surname: {
    value: '',
    label: 'Фамилия',
    error: false,
    pattern: '',
    message: 'Введите фамилию',
    type: 'text',
    autocomplete: 'off'
  },
  username: {
    value: '',
    label: 'Логин',
    error: false,
    pattern: /^[a-z0-9_-]{3,20}$/,
    message: 'Латиница. Длина от 3 до 20 символов (1-9, a-z, -, _)',
    type: 'text',
    autocomplete: 'username'
  },
  old_password: {
    value: '',
    label: 'Старый пароль',
    error: false,
    pattern: '',
    message: '',
    type: 'password',
    autocomplete: 'off'
  },
  new_password: {
    value: '',
    label: 'Новый пароль',
    error: false,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,50}$/,
    message:
      'Латиница. Длина от 6 до 50 символов. Обязятельно - 1 заглавная буква, 1 прописная буква, 1 цифра.',
    type: 'password',
    autocomplete: 'new-password'
  },
  new_password_check: {
    value: '',
    label: 'Новый пароль еще раз',
    error: false,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,50}$/,
    message:
      'Латиница. Длина от 6 до 50 символов. Обязятельно - 1 заглавная буква, 1 прописная буква, 1 цифра.',
    type: 'password',
    autocomplete: 'new-password'
  },
  email: {
    value: '',
    label: 'Адрес эл. почты',
    error: false,
    pattern: '',
    message: 'Введите адрес эл. почты',
    type: 'email',
    autocomplete: 'off'
  }
}

const reducer = (state, { field, value }) => ({
  ...state,
  [field]: { ...state[field], ...value }
})

const info_fields = ['name', 'surname', 'username']
const pwd_fields = ['old_password', 'new_password', 'new_password_check']

export const EditProfile = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [editEmail, setEmailEdit] = useState(false)
  const [editPassword, setEditPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const { error, token } = useSelector(state => state.auth)

  const disp = useDispatch()

  const formatData = fields => {
    let data = {}
    fields.forEach(field => {
      data[field] = state[field].value
    })
    return data
  }

  useEffect(() => {
    let reason = error && error.reason
    if (reason) {
      if (reason === 'username') {
        dispatch({ field: 'username', value: { error: true } })
      }
      if (reason === 'password') {
        dispatch({ field: 'old_password', value: { error: true } })
      }
    } else {
      dispatch({ field: 'username', value: { error: false } })
      dispatch({ field: 'old_password', value: { error: false } })
    }
  }, [error])

  useEffect(() => {
    if (token) {
      let data = jwt_decode(token)
      setSuccess(true)
      info_fields.forEach(field => {
        dispatch({ field: field, value: { value: data[field] } })
      })
      dispatch({ field: 'email', value: { value: data.email } })
    } else {
      history.push('/')
    }
  }, [token])

  useEffect(() => {
    setSuccess(false)
  }, [])

  const handleChange = e => {
    dispatch({ field: e.target.name, value: { value: e.target.value } })
  }

  const handleSubmit = e => {
    setSuccess(false)
    e.preventDefault()
    disp(updateUser(formatData(info_fields), token))
  }

  const submitEmail = e => {
    setSuccess(false)
    e.preventDefault()
    disp(updateEmail(state.email.value, token)).then(res => {
      console.log(res)
      if (!res.ok) return
      dispatch({ field: 'email', value: { value: '' } })
      setEmailEdit(false)
    })

    console.log('submit email', state.email.value)
  }

  const submitPassword = e => {
    setSuccess(false)
    e.preventDefault()

    if (state.new_password.value !== state.new_password_check.value) {
      dispatch({ field: 'new_password', value: { error: true } })
      dispatch({ field: 'new_password_check', value: { error: true } })
    } else {
      dispatch({ field: 'new_password', value: { error: false } })
      dispatch({ field: 'new_password_check', value: { error: false } })

      disp(
        updatePassword(
          state.old_password.value,
          state.new_password.value,
          token
        )
      ).then(res => {
        console.log(res)
        if (!res.ok) return
        dispatch({ field: 'new_password', value: { value: '' } })
        dispatch({ field: 'new_password_check', value: { value: '' } })
        dispatch({ field: 'old_password', value: { value: '' } })
        setEditPassword(false)
      })
    }
  }

  let form = info_fields.map(field => (
    <Label key={field}>
      {state[field].label}
      <Input
        error={state[field].error}
        className={styledInput}
        type={state[field].type}
        name={field}
        value={state[field].value}
        onChange={handleChange}
        autoComplete={state[field].autocomplete}
        pattern={state[field].pattern.source}
        required
        title={state[field].message}
      />
    </Label>
  ))

  let pwd = pwd_fields.map(field => (
    <Label key={field}>
      {state[field].label}
      <Input
        error={state[field].error}
        className={styledInput}
        type={state[field].type}
        name={field}
        value={state[field].value}
        onChange={handleChange}
        autoComplete={state[field].autocomplete}
        pattern={state[field].pattern.source}
        required
        title={state[field].message}
      />
    </Label>
  ))

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Title>Изменение профиля</Title>
        {form}
        <AddButton className={button}>Сохранить</AddButton>
      </Form>
      <h3>Настройки</h3>
      <form onSubmit={submitEmail}>
        <Label>
          {state.email.label}
          <Input
            error={state.email.error}
            className={emailStyle}
            type={state.email.type}
            name="email"
            value={state.email.value}
            onChange={handleChange}
            autoComplete="off"
            required
            title={state.email.message}
            onClick={() => setEmailEdit(true)}
            // onBlur={() => setEmailEdit(false)}
          />
        </Label>
        {editEmail ? (
          <ButtonsBlock>
            <AddButton type="submit" className={emailButton}>
              Сохранить
            </AddButton>
            <CloseButton onClick={() => setEmailEdit(false)} />
          </ButtonsBlock>
        ) : (
          <Button
            type="button"
            className={emailButton}
            onClick={() => setEmailEdit(true)}
          >
            Изменить адрес
          </Button>
        )}
      </form>
      <form onSubmit={submitPassword}>
        <p className={pwdLabel}>Пароль</p>
        {editPassword ? (
          <>
            {pwd}
            <ButtonsBlock>
              <AddButton type="submit" className={emailButton}>
                Сохранить
              </AddButton>
              <CloseButton onClick={() => setEditPassword(false)} />
            </ButtonsBlock>
          </>
        ) : (
          <Button onClick={() => setEditPassword(true)} className={emailButton}>
            Изменить пароль
          </Button>
        )}
      </form>

      {error && error.reason === 'username' && (
        <Alert text="Пользователь с таким логином уже существует" />
      )}
      {error && error.reason === 'password' && (
        <Alert text="Старый пароль введен неверно" />
      )}
      {state.new_password.error && (
        <Alert text="Введенные пароли не сопадают" />
      )}

      {error && error.reason === 'email' && (
        <Alert text="Произошла ошибка при сохранении адреса" />
      )}

      {success && <Alert text="Информация обновлена успешно" success />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  text-align: left;
  vertical-align: middle;
  max-width: 500px;

  @media (max-width: 1100px) {
    max-width: 400px;
  }

  @media (max-width: 500px) {
    max-width: 280px;
  }

  @media (max-height: 750px) {
    margin-top: -30px;
  }

  @media (max-height: 700px) {
    margin-top: -60px;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  text-align: center;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 1rem;
  color: var(--secondary-text);
`

const styledInput = css`
  font-size: 1.2rem;
  height: 2em;
  margin: 10px 0 20px 0;
`

const button = css`
  font-size: 1.2rem;
  height: 2em;
  margin-bottom: 20px;
`

const emailStyle = css`
  margin: 10px 0;
  font-size: 1.2rem;
  padding: 8px 0 8px 12px;
  background-color: var(--secondary);
  border: 1px solid var(--secondary__dark);
  transition: background-color 0.3s ease;
  color: var(--secondary-text);
  cursor: pointer;

  &::placeholder {
    color: var(--secondary-text);
  }

  &:hover {
    background-color: var(--secondary__dark);
  }

  &:focus {
    background-color: white;
    color: black;
    cursor: text;
    &::placeholder {
      color: grey;
    }

    &:hover {
      background-color: white;
    }
  }
`

const emailButton = css`
  font-size: 1rem;
  margin-right: 10px;
  width: fit-content;
`

const pwdLabel = css`
  width: 100%;
  font-weight: bold;
  margin: 20px 0 10px 0;
`

const ButtonsBlock = styled.div`
  display: flex;
  align-items: center;
`
