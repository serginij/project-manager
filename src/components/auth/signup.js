import React, { useReducer } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import { signup } from '@symbiotes/effects/'

import { Input, AddButton, StyledLink, Alert } from '@ui'

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
  password: {
    value: '',
    label: 'Пароль',
    error: false,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,50}$/,
    message:
      'Латиница. Длина от 6 до 50 символов. Обязятельно - 1 заглавная буква, 1 прописная буква, 1 цифра.',
    type: 'password',
    autocomplete: 'new-password'
  },
  email: {
    value: '',
    label: 'Эл. почта',
    error: false,
    pattern: '',
    message: 'Введите адрес эл. почты',
    type: 'email',
    autocomplete: 'off'
  }
}

const reducer = (state, { field, value }) => ({
  ...state,
  [field]: { ...state[field], value: value }
})

const fields = Object.keys(initialState)

export const Signup = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const err = useSelector(state => state.auth.error)

  const disp = useDispatch()

  const handleChange = e => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    let data = {}
    fields.forEach(field => {
      data[field] = state[field].value
    })

    console.log('done', data)
    disp(signup(data))
  }

  let form = fields.map(field => (
    <Label key={field}>
      {state[field].label}
      <Input
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

  // let disabled = fields.reduce((flag, field) => {
  //   if (!state[field].value.trim().length) {
  //     return true
  //   }
  // }, false)

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
        {form}
        <AddButton
          // disabled={disabled}
          className={button}
        >
          Зарегистрироваться
        </AddButton>
      </Form>
      <Text>
        <StyledLink to="/auth">Вход</StyledLink>
      </Text>
      <p>2020, Project manager</p>
      {err && err.reason === 'username' && (
        <Alert text="Пользователь с таким логином уже существует" />
      )}
      {err && err.reason === 'email' && (
        <Alert text="Пользователь с такой почтой уже существует" />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  align-items: center;
  text-align: center;
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

const Text = styled.p`
  text-align: center;
  font-size: 1rem;
  /* margin-top: -5px; */
  cursor: pointer;
`

const Label = styled.label`
  color: var(--secondary-text);
  text-align: left;
  font-size: 1rem;
`

const styledInput = css`
  font-size: 1.2rem;
  height: 2.5em;
  margin: 10px 0 20px 0;
`

const button = css`
  font-size: 1.2rem;
  height: 2.5em;
`
