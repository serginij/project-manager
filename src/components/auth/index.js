import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { useDispatch } from 'react-redux'

import { login, signup } from '@symbiotes/effects'

import { Input, AddButton, StyledLink } from '@ui'

export const Auth = () => {
  const [type, setType] = useState('Login')
  const [data, setData] = useState({
    usr: '',
    pwd: ''
  })

  const dispatch = useDispatch()

  const handleSwitch = () => {
    type === 'Login' ? setType('Signup') : setType('Login')
  }

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    type === 'Login'
      ? dispatch(login(data.usr, data.pwd))
      : dispatch(signup(data.usr, data.pwd))
  }

  return (
    <Wrapper>
      <h1>{type}</h1>
      <Form onSubmit={handleSubmit}>
        <StyledInput
          name="usr"
          placeholder="Username"
          type="text"
          value={data.usr}
          onChange={handleChange}
        />
        <StyledInput
          name="pwd"
          placeholder="Password"
          type="password"
          value={data.pwd}
          onChange={handleChange}
        />
        <Switch onClick={handleSwitch}>
          {type === 'Login' ? 'Signup' : 'Login'}
        </Switch>
        <Button>{type}</Button>
      </Form>
      <p>
        <StyledLink to="/resetpwd">Reset Password</StyledLink>
      </p>
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

const StyledInput = styled(Input)`
  font-size: 1.2rem;
  height: 2.5em;
  margin-bottom: 20px;
`

const Button = styled(AddButton)`
  font-size: 1.2rem;
  height: 2.5em;
`
