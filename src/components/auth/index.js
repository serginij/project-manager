import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useDispatch } from 'react-redux'

import { login, signup } from '@symbiotes/effects'

import { Input, AddButton } from '@ui'

export const Auth = () => {
  const [type, setType] = useState('Вход')
  const [data, setData] = useState({
    usr: '',
    pwd: ''
  })

  const dispatch = useDispatch()

  const handleSwitch = () => {
    type === 'Вход' ? setType('Регистрация') : setType('Вход')
  }

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    type === 'Вход'
      ? dispatch(login(data.usr, data.pwd))
      : dispatch(signup(data.usr, data.pwd))
  }

  return (
    <Wrapper>
      <h1>{type}</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          className={styledInput}
          name="usr"
          placeholder="Логин"
          type="text"
          value={data.usr}
          onChange={handleChange}
        />
        <Input
          className={styledInput}
          name="pwd"
          placeholder="Пароль"
          type="password"
          value={data.pwd}
          onChange={handleChange}
        />
        <Switch onClick={handleSwitch}>
          {type === 'Вход' ? 'Регистрация' : 'Вход'}
        </Switch>
        <AddButton className={button}>{type}</AddButton>
      </Form>
      {/* <p>
        <StyledLink to="/resetpwd">Reset Password</StyledLink>
      </p> */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 30%;
  margin: auto;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  margin-top: 10%;
  min-width: 270px;
  max-width: 500px;
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
