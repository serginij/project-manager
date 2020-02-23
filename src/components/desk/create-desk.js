import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { Input, AddButton, FormTitle, FormWrapper as Wrapper } from '@ui'
import { Checkbox } from '@components/desk/cards/check-lists/checkbox'
import { addDesk } from '@symbiotes/effects/'
import { history } from '@lib/routing'

export const CreateDesk = props => {
  const [name, setName] = useState('')
  const [checked, setChecked] = useState(false)
  const { currentTeam } = useSelector(state => state.teams)

  const dispatch = useDispatch()

  const handleChange = e => {
    setName(e.target.value)
  }

  useEffect(() => {
    if (!currentTeam) {
      history.push('/')
    }
  }, [currentTeam])

  const handleAddDesk = () => {
    if (checked) {
      history.push('/mindmap')
      history.location.state = { name: name }
    } else {
      dispatch(addDesk(name, currentTeam)).then(props.history.push('/'))
    }
  }

  return (
    <Wrapper>
      <h2>Создание доски</h2>
      <FormTitle>Название доски</FormTitle>
      <Input
        className={styledInput}
        type="text"
        id="name"
        placeholder="Название"
        value={name}
        onChange={handleChange}
      />
      <TextBlock>
        <p>Использовать интеллект-карту</p>
        <Checkbox
          checked={checked}
          onClick={e => setChecked(!e.target.checked)}
          onChange={e => setChecked(!e.target.checked)}
          className={checkStyle}
          background="#ffffff"
        />
      </TextBlock>
      <AddButton
        disabled={name === ''}
        type="button"
        className={button}
        onClick={handleAddDesk}
      >
        Создать
      </AddButton>
    </Wrapper>
  )
}

const TextBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const styledInput = css`
  font-size: 1.2rem;
  height: 2.2em;
  margin-bottom: 10px;
`

const button = css`
  font-size: 1.2rem;
  height: 2.2em;
  width: 100%;
`

const checkStyle = css`
  margin: 0;
`
