import React, { useState, useEffect } from 'react'
import { styled } from 'linaria/react'

import warning from '@assets/warning.png'
import ok from '@assets/ok.png'

export const Alert = ({
  runEffect,
  success = false,
  text = success ? 'Успешно' : 'Произошла ошибка'
}) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    runEffect && runEffect()
    setTimeout(() => {
      setVisible(false)
    }, 5000)
  }, [runEffect])

  return (
    <Body visible={visible} onClick={() => setVisible(false)} success={success}>
      <Img src={success ? ok : warning} alt="" />
      <p>{text}</p>
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
  min-width: 180px;
  min-height: 40px;
  border-radius: 3px;
  background-color: ${props => (props.success ? 'var(--green)' : 'var(--red)')};
  color: white;
  font-weight: 400;
  cursor: pointer;
  text-align: center;
`

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`
