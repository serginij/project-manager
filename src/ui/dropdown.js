import React, { useState } from 'react'
import { styled } from 'linaria/react'

import { StyledLink } from './styled-link'

export const Dropdown = ({ children, width, list, align }) => {
  let [visible, setVisible] = useState(false)
  let [data, setData] = useState({ width: width })

  let listBody = list.map((el, index) => {
    console.log(el, el.link ? el.link : el.text)
    return (
      <Item key={index} onClick={el.action}>
        {el.link ? <StyledLink to={el.link}>{el.text}</StyledLink> : el.text}
      </Item>
    )
  })

  const handleClick = e => {
    let { x, y, width, height } = e.target.getBoundingClientRect()
    // width = data.width ? data.width : width
    x = align ? x - data.width / 2 + width / 2 : x
    setData({
      x: x,
      y: y + height,
      width: data.width ? data.width : width
    })
    setVisible(!visible)
  }

  return (
    <Wrapper>
      <Header onClick={handleClick}>{children}</Header>
      <List
        onMouseLeave={() => setVisible(false)}
        visible={visible}
        x={data.x}
        y={data.y}
        width={data.width}
      >
        {listBody}
      </List>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Header = styled.div``

const Item = styled.li`
  text-align: center;
  padding: 0.5em;
  box-sizing: border-box;
  cursor: pointer;
`

const List = styled.ul`
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  width: ${props => props.width}px;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  border: none;
  border-radius: 3px;
  list-style: none;
  margin-top: 12px;
  padding: 0;
  background-color: white;
`
