import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import {
  updateDesk,
  findTeamUser,
  addDeskUser,
  deleteDeskUser
} from '@symbiotes/effects'
import { Input, AddButton, FindUser, FormTitle, UserList } from '@ui'

export const DeskSettings = () => {
  const desk = useSelector(state => state.desks.desks[state.desks.currentDesk])
  const { findList } = useSelector(state => state.desks)

  const [data, setData] = useState({
    name: desk.name
  })

  const { token } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(updateDesk(data.name, desk.id, token))
  }

  const searchUser = username => dispatch(findTeamUser(desk.team_id, username))
  const addUser = user => dispatch(addDeskUser(user, desk.id, token))
  const deleteUser = userId => {
    dispatch(deleteDeskUser(userId, desk.id, token))
  }

  return (
    <Wrapper>
      <h2>Edit desk</h2>
      <form onSubmit={handleSubmit}>
        <FormTitle>Название</FormTitle>
        <Input
          className={styledInput}
          type="text"
          placeholder="Название"
          value={data.name}
          onChange={handleChange}
          name="name"
        />
        <FindUser
          findList={findList}
          onSearch={searchUser}
          onSelect={addUser}
        />
        <UserList users={desk.users} deleteUser={deleteUser} />
        <AddButton className={button}>Сохранить</AddButton>
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

const styledInput = css`
  font-size: 1rem;
  height: 2.5em;
  margin-bottom: 20px;
`

const button = css`
  font-size: 1rem;
  height: 2.2em;
  width: 40%;
  margin-top: 20px;
`
