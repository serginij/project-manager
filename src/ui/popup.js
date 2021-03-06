import React, { useState, useCallback } from 'react'
import { styled } from 'linaria/react'

export const Popup = ({ children, width, onClick, className }) => {
  let [visible, setVisible] = useState(true)

  const changeVisible = useCallback(() => {
    setVisible(v => !v)
    onClick()
  }, [onClick])

  return (
    <Wrapper visible={visible} onClick={changeVisible}>
      <Content
        className={className}
        width={width}
        onClick={e => e.stopPropagation()}
      >
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
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: default;
`

const Content = styled.section`
  margin: auto;
  margin-top: 5%;
  width: ${props => props.width}%;
  background-color: white;
  z-index: 2;
  border-radius: 3px;
`
