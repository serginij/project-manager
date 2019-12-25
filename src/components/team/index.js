import React from 'react'
import { css } from 'linaria'
import { useSelector } from 'react-redux'

import { TextArea, FormTitle, UserList, FormWrapper as Wrapper } from '@ui'

export const Team = () => {
  const team = useSelector(state => state.teams.teams[state.teams.currentTeam])

  return (
    <Wrapper>
      <h2>Информация о команде {team.name}</h2>
      <FormTitle>Описание</FormTitle>
      <TextArea
        className={styledTextArea}
        type="text"
        placeholder="Описание"
        value={team.desc}
        name="desc"
        disabled
      />
      <FormTitle>Пользователи</FormTitle>
      <UserList users={team.users} showRole />
    </Wrapper>
  )
}
const styledTextArea = css`
  font-size: 1rem;
  height: 5em;
`
