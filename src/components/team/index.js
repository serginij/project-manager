import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { useSelector, useDispatch } from 'react-redux'

import { updateTeam, findUser } from '@symbiotes/effects'
import { teamsActions } from '@symbiotes/teams'

import { Input, AddButton, TextArea } from '@ui'

export const Team = () => {
  const team = useSelector(state => state.teams.teams[state.teams.currentTeam])
  const { findList } = useSelector(state => state.teams)

  const [data, setData] = useState({
    name: team.name,
    desc: team.desc,
    find: ''
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

  const searchUser = e => {
    e.preventDefault()
    handleChange(e)
    dispatch(findUser(e.target.value))
  }

  let users = findList.map(user => (
    <UserItem key={user.id}>
      <p>{user.username}</p>
    </UserItem>
  ))

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
      <form onSubmit={searchUser}>
        <Input
          type="text"
          placeholder="username"
          value={data.find}
          name="find"
          onChange={searchUser}
        />
        {/* <AddButton>Find</AddButton> */}
      </form>
      <UserList onMouseLeave={() => dispatch(teamsActions.findUsers([]))}>
        {users}
      </UserList>
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

const UserList = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0%;
  margin: -8px 0 0 0;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
    0 0 0 1px rgba(9, 30, 66, 0.08);
`

const UserItem = styled.li`
  width: 100%;
  background-color: white;
  /* margin: 8px 0; */
  box-sizing: border-box;
  padding: 8px 0 8px 12px;
  cursor: pointer;
  :hover {
    background-color: #fafafa;
  }
  p {
    margin: 0;
  }
`
