import React, { useState } from 'react'
import { styled } from 'linaria/react'

export const Dropdown = ({ children, width, content, align, close = true }) => {
  let [visible, setVisible] = useState(false)
  let [data, setData] = useState({ width: width })

  const handleClick = e => {
    let { x, y, width, height } = e.target.getBoundingClientRect()
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
      <Body
        onMouseLeave={close ? () => setVisible(false) : null}
        visible={visible}
        x={data.x}
        y={data.y}
        width={data.width}
      >
        {content}
      </Body>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Header = styled.div``

const Body = styled.ul`
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
  box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
`
