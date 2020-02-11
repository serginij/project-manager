import React, { useState } from 'react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import { addTeam } from '@symbiotes/effects/'

import { Input, AddButton, TextArea, FormWrapper as Wrapper } from '@ui'

export const CreateTeam = props => {
  const [data, setData] = useState({
    name: '',
    desc: ''
  })

  const { token } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addTeam(data.name, data.desc, token)).then(() =>
      props.history.push('/')
    )
  }

  return (
    <Wrapper>
      <h2>Создание команды</h2>
      <form onSubmit={handleSubmit}>
        <Input
          className={styledInput}
          type="text"
          placeholder="Название команды"
          value={data.name}
          onChange={handleChange}
          name="name"
        />
        <TextArea
          className={styledTextArea}
          type="text"
          placeholder="Описание"
          value={data.desc}
          onChange={handleChange}
          name="desc"
        />
        <AddButton className={button}>Создать</AddButton>
      </form>
    </Wrapper>
  )
}

const styledInput = css`
  font-size: 1.2rem;
  height: 2.5em;
  margin-bottom: 20px;
`

const styledTextArea = css`
  font-size: 1.2rem;
  height: 5em;
  margin-bottom: 20px;
`

const button = css`
  font-size: 1.2rem;
  height: 2.5em;
  width: 100%;
`
