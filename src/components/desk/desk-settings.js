import React, { useState } from 'react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import {
  updateDesk,
  findTeamUser,
  addDeskUser,
  deleteDeskUser,
  deleteDesk as delDesk
} from '@symbiotes/effects'
import {
  Input,
  FindUser,
  FormTitle,
  UserList,
  SaveCancelBlock,
  FormWrapper as Wrapper
} from '@ui'

export const DeskSettings = () => {
  const desk = useSelector(state => state.desks.desks[state.desks.currentDesk])
  const { foundList } = useSelector(state => state.desks)

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
  const deleteDesk = () => dispatch(delDesk(desk.team_id, desk.id, token))

  return (
    <Wrapper>
      <h2>Настройки доски</h2>
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
          foundList={foundList}
          onSearch={searchUser}
          onSelect={addUser}
        />
        <UserList users={desk.users} deleteUser={deleteUser} />
        <SaveCancelBlock
          handleCancel={deleteDesk}
          title="Удаление доски"
          buttonText="Удалить доску"
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
