import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { useSelector, useDispatch } from 'react-redux'

import { updateTeam, findUser, addTeamUser } from '@symbiotes/effects'
import { Input, AddButton, TextArea, FindUser } from '@ui'

import { UserList } from './user-list'

export const Team = () => {
  const team = useSelector(state => state.teams.teams[state.teams.currentTeam])
  const { findList } = useSelector(state => state.teams)

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

  return (
    <Wrapper>
      <h2>Edit team</h2>
      <form onSubmit={handleSubmit}>
        <h3>Name</h3>
        <StyledInput
          type="text"
          placeholder="Team name"
          value={data.name}
          onChange={handleChange}
          name="name"
        />
        <h3>Description</h3>
        <StyledTextArea
          type="text"
          placeholder="Team description"
          value={data.desc}
          onChange={handleChange}
          name="desc"
        />
        <Button>Сохранить</Button>
      </form>
      <FindUser findList={findList} onSearch={searchUser} onSelect={addUser} />
      <UserList users={team.users} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 30%;
  margin: auto;
  margin-top: 5%;
  align-items: center;
  text-align: center;
`

const StyledInput = styled(Input)`
  font-size: 1.2rem;
  height: 2.5em;
  margin-bottom: 20px;
`

const StyledTextArea = styled(TextArea)`
  font-size: 1.2rem;
  height: 5em;
  margin-bottom: 20px;
`

const Button = styled(AddButton)`
  font-size: 1.2rem;
  height: 2.5em;
  width: 100%;
`
