import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import { login } from '@symbiotes/effects/'

import { Input, AddButton, StyledLink, Alert } from '@ui'

export const Auth = () => {
  const [data, setData] = useState({
    usr: '',
    pwd: ''
  })

  const { error, signup } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('handleSubmit login')
    dispatch(login(data.usr, data.pwd))
  }

  return (
    <Wrapper>
      <h1>Project manager</h1>
      <p>Приложение для управления проектами</p>
      <Form onSubmit={handleSubmit}>
        <h2>Вход</h2>
        <Input
          className={styledInput}
          name="usr"
          placeholder="Логин"
          type="text"
          value={data.usr}
          onChange={handleChange}
          autoComplete="username"
        />
        <Input
          className={styledInput}
          name="pwd"
          placeholder="Пароль"
          type="password"
          value={data.pwd}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <Switch>
          <StyledLink to="/signup">Регистрация</StyledLink>
        </Switch>
        <AddButton className={button}>Вход</AddButton>
      </Form>
      {/* <p>
        <StyledLink to="/resetpwd">Reset Password</StyledLink>
      </p> */}
      <p>2020, Project manager</p>
      {error && <Alert text="Неправильный логин или пароль" />}
      {signup && <Alert text="Пользователь зарегистирован" success={true} />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  margin-top: 5%;
  max-width: 500px;

  @media (max-width: 1100px) {
    max-width: 400px;
  }

  @media (max-width: 500px) {
    max-width: 280px;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Switch = styled.p`
  text-align: right;
  margin-top: -5px;
  cursor: pointer;
`

const styledInput = css`
  font-size: 1.2rem;
  height: 2.5em;
  margin-bottom: 20px;
`

const button = css`
  font-size: 1.2rem;
  height: 2.5em;
`
