import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { useSelector, useDispatch } from 'react-redux'

import {
  updateTeam,
  findUser,
  addTeamUser,
  deleteTeamUser,
  updateTeamUser
} from '@symbiotes/effects'
import { Input, AddButton, TextArea, FindUser, FormTitle, UserList } from '@ui'

export const Team = () => {
  const team = useSelector(state => state.teams.teams[state.teams.currentTeam])
  const { findList, currentTeam } = useSelector(state => state.teams)

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
    dispatch(updateTeamUser(userId, currentTeam, !isAdmin))
  }

  return (
    <Wrapper>
      <h2>Edit team</h2>
      <form onSubmit={handleSubmit}>
        <FormTitle>Name</FormTitle>
        <StyledInput
          type="text"
          placeholder="Team name"
          value={data.name}
          onChange={handleChange}
          name="name"
        />
        <FormTitle>Description</FormTitle>
        <StyledTextArea
          type="text"
          placeholder="Team description"
          value={data.desc}
          onChange={handleChange}
          name="desc"
        />
        <FindUser
          findList={findList}
          onSearch={searchUser}
          onSelect={addUser}
        />
        <UserList
          users={team.users}
          deleteUser={deleteUser}
          updateUser={updateUser}
        />
        <Button>Сохранить</Button>
      </form>
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

const StyledInput = styled(Input)`
  font-size: 1rem;
  height: 2.5em;
  margin-bottom: 20px;
`

const StyledTextArea = styled(TextArea)`
  font-size: 1rem;
  height: 5em;
`

const Button = styled(AddButton)`
  font-size: 1rem;
  height: 2.2em;
  width: 40%;
  margin-top: 20px;
`
