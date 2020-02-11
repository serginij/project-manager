import React, { useState } from 'react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import {
  updateTeam,
  findUser,
  addTeamUser,
  deleteTeamUser,
  updateTeamUser,
  deleteTeam as delTeam
} from '@symbiotes/effects/'
import {
  Input,
  TextArea,
  FindUser,
  FormTitle,
  UserList,
  SaveCancelBlock,
  FormWrapper as Wrapper
} from '@ui'

export const TeamSettings = () => {
  const team = useSelector(state => state.teams.teams[state.teams.currentTeam])
  const { foundList, currentTeam } = useSelector(state => state.teams)

  const [data, setData] = useState({
    name: team.name,
    desc: team.desc
  })

  const { token } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(updateTeam(data.name, data.desc, team.id, token))
  }

  const searchUser = username => dispatch(findUser(username))
  const addUser = user => dispatch(addTeamUser(user, team.id, token))

  const deleteUser = userId => {
    dispatch(deleteTeamUser(userId, currentTeam, token))
  }

  const updateUser = (userId, isAdmin) => {
    dispatch(updateTeamUser(userId, currentTeam, !isAdmin, token))
  }

  const deleteTeam = () => dispatch(delTeam(team.id, token))

  return (
    <Wrapper>
      <h2>Изменение команды</h2>
      <form onSubmit={handleSubmit}>
        <FormTitle>Название</FormTitle>
        <Input
          className={styledInput}
          type="text"
          placeholder="Название команды"
          value={data.name}
          onChange={handleChange}
          name="name"
        />
        <FormTitle>Описание</FormTitle>
        <TextArea
          className={styledTextArea}
          type="text"
          placeholder="Описание команды"
          value={data.desc}
          onChange={handleChange}
          name="desc"
        />
        <FindUser
          foundList={foundList}
          onSearch={searchUser}
          onSelect={addUser}
        />
        <UserList
          users={team.users}
          deleteUser={deleteUser}
          updateUser={updateUser}
        />
        <SaveCancelBlock
          handleCancel={deleteTeam}
          title="Удаление команды"
          buttonText="Удалить команду"
        />
      </form>
    </Wrapper>
  )
}

const styledInput = css`
  font-size: 1rem;
  height: 2.5em;
  margin-bottom: 20px;
`

const styledTextArea = css`
  font-size: 1rem;
  height: 5em;
`
