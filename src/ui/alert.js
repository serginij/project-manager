import React, { useState, useEffect } from 'react'
import { styled } from 'linaria/react'

import warning from '@assets/warning.png'

export const Alert = ({ runEffect }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    runEffect && runEffect()
    setTimeout(() => {
      setVisible(false)
    }, 3000)
  }, [runEffect])

  return (
    <Body visible={visible} onClick={() => setVisible(false)}>
      <Img src={warning} alt="" />
      <p>Someting went wrong</p>
    </Body>
  )
}

const Body = styled.div`
  position: absolute;
  display: ${props => (props.visible ? 'flex' : 'none')};
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  top: 60px;
  right: 10px;
  width: 180px;
  height: 40px;
  border-radius: 3px;
  background-color: var(--red);
  color: white;
  font-weight: 400;
  cursor: pointer;
  text-align: center;
`

const Img = styled.img`
  width: 20px;
  height: 20px;
`
