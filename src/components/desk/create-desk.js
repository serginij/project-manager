import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { css } from 'linaria'

import { Input, AddButton, FormTitle, FormWrapper as Wrapper } from '@ui'

import { addDesk } from '@symbiotes/effects/'

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
      <h2>Создание доски</h2>
      <form onSubmit={handleSubmit}>
        <FormTitle>Название доски</FormTitle>
        <Input
          className={styledInput}
          type="text"
          id="name"
          placeholder="Название"
          value={name}
          onChange={handleChange}
        />
        <AddButton className={button}>Создать</AddButton>
      </form>
    </Wrapper>
  )
}

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
