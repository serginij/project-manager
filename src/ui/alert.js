import React, { useState, useEffect } from 'react'
import { styled } from 'linaria/react'
// import { CloseButton } from './close-button'

export const Alert = ({ runEffect }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    runEffect && runEffect()
    // console.log('mounted')
    setTimeout(() => {
      setVisible(false)
      // console.log('closed')
    }, 3000)
  }, [runEffect])

  return (
    <Body visible={visible} onClick={() => setVisible(false)}>
      <p>Someting went wrong</p>
      {/* <CloseButton  /> */}
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
  background-color: var(--gray-background);
  color: crimson;
  /* font-weight: 500; */
  cursor: pointer;
  text-align: center;
`
