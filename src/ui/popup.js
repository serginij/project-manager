import React, { useState, useCallback } from 'react'
import { styled } from 'linaria/react'

export const Popup = ({ children, width, onClick }) => {
  let [visible, setVisible] = useState(true)

  const changeVisible = useCallback(() => {
    setVisible(v => !v)
    onClick()
    console.log('change visibility ', visible)
  }, [onClick, visible])

  return (
    <Wrapper visible={visible} onClick={changeVisible}>
      <Content width={width} onClick={e => e.stopPropagation()}>
        {children}
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  left: 0;
  top: 0;
  display: ${props => (props.visible ? 'block' : 'none')};
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`

const Content = styled.section`
  margin: auto;
  margin-top: 5%;
  width: ${props => props.width}%;
  background-color: white;
  z-index: 2;
  border-radius: 3px;
`
