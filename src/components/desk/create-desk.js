import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { Input, AddButton, FormTitle } from '@ui'

import { addDesk } from '@symbiotes/effects'

export const CreateDesk = props => {
  const [name, setName] = useState('')
  const { currentTeam } = useSelector(state => state.teams)

  const dispatch = useDispatch()

  const handleChange = e => {
    setName(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addDesk(name, currentTeam)).then(props.history.push('/'))
  }

  return (
    <Wrapper>
      <h2>Create desk</h2>
      <form onSubmit={handleSubmit}>
        <FormTitle>Desk name</FormTitle>
        <Input
          className={styledInput}
          type="text"
          id="name"
          placeholder="desk name"
          value={name}
          onChange={handleChange}
        />
        <AddButton className={button}>Add</AddButton>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 30%;
  margin: auto;
  margin-top: 10%;
  align-items: center;
  text-align: center;
`

const styledInput = css`
  font-size: 1.2rem;
  height: 2.2em;
  margin-bottom: 20px;
`

const button = css`
  font-size: 1.2rem;
  height: 2.2em;
  width: 100%;
`
