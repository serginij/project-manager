import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector } from 'react-redux'

import { TextArea, FormTitle, UserList } from '@ui'

export const Team = () => {
  const team = useSelector(state => state.teams.teams[state.teams.currentTeam])

  return (
    <Wrapper>
      <h2>{team.name} информация team info</h2>
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

const Wrapper = styled.div`
  width: 30%;
  margin: auto;
  margin-top: 5%;
  text-align: center;
  min-width: 270px;
  max-width: 500px;
`

const styledTextArea = css`
  font-size: 1rem;
  height: 5em;
`
