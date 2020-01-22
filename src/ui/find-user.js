import React, { useState } from 'react'
import { styled } from 'linaria/react'

import { Input } from './input'

export const FindUser = ({ foundList, onSearch, onSelect }) => {
  const [value, setValue] = useState('')
  const [isVisible, setVisible] = useState(false)
  const [params, setParams] = useState({
    x: 0,
    y: 0,
    width: 0
  })

  const handleChange = e => {
    setValue(e.target.value)
    const { x, y, width, height } = e.target.getBoundingClientRect()
    setVisible(true)
    setParams({
      x: x,
      y: y + height,
      width: width
    })
  }

  const searchUser = e => {
    e.preventDefault()
    handleChange(e)
    onSearch(e.target.value)
  }

  const handleAddUser = user => {
    onSelect(user)
  }

  let users = foundList.map(user => (
    <UserItem key={user.id} onClick={() => handleAddUser(user)}>
      <p>{user.username}</p>
    </UserItem>
  ))

  return (
    <Wrapper>
      <Title>Пользователи</Title>
      <Input
        type="text"
        value={value}
        onChange={searchUser}
        placeholder="логин"
      />
      <FindList
        x={params.x}
        y={params.y}
        width={params.width}
        visible={isVisible}
        onMouseLeave={() => setVisible(false)}
      >
        {users}
      </FindList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  align-items: center;
  text-align: center;
`

const FindList = styled.ul`
  position: absolute;
  left: ${props => props.x};
  top: ${props => props.y};
  display: ${props => (props.visible ? 'block' : 'none')};
  list-style: none;
  width: ${props => `${props.width}px`};
  padding: 0%;
  margin: -8px 0 0 0;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
    0 0 0 1px rgba(9, 30, 66, 0.08);
`

const UserItem = styled.li`
  width: 100%;
  background-color: white;
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

const Title = styled.h3`
  text-align: left;
`
