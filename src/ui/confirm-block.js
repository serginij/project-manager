import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { CloseButton } from './close-button'
import { Button } from './button'

export const ConfirmBlock = ({
  width = 250,
  children,
  onConfirm,
  title,
  buttonText
}) => {
  let [visible, setVisible] = useState(false)
  let [data, setData] = useState({ width: width })

  const handleClick = e => {
    let { x, y, width, height } = e.target.getBoundingClientRect()
    // x = align ? x - data.width / 2 + width / 2 : x
    setData({
      x: x,
      y: y + height,
      width: data.width ? data.width : width
    })
    setVisible(!visible)
  }

  const hanldeClose = () => setVisible(close)

  return (
    <>
      <WrapButton onClick={handleClick}>{children}</WrapButton>
      <BackDrop visible={visible} onClick={hanldeClose}>
        <Wrapper
          visible={visible}
          width={data.width}
          x={data.x}
          y={data.y}
          onBlur={hanldeClose}
        >
          <Header>
            <Name>{title}</Name>
            <CloseButton onClick={hanldeClose} className={cancelButton}>
              ×
            </CloseButton>
          </Header>
          <Text>Данное действие необратимо.</Text>
          <Button onClick={onConfirm} className={styledButton}>
            {buttonText}
          </Button>
        </Wrapper>
      </BackDrop>
    </>
  )
}

const WrapButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`

const BackDrop = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`

const Wrapper = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  width: ${props => props.width}px;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  margin-top: 12px;
  padding: 12px;
  padding-top: 0;
  font-size: 14px;
  box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
  background-color: white;
`

const styledButton = css`
  background-color: var(--red);
  color: white;
`

const Text = styled.p``

const Name = styled.p``

const cancelButton = css`
  font-weight: 200;
  text-align: center;
`

const Header = styled.header`
display: flex;
justify-content: space-between
border-bottom: 1px solid var(--dark-gray)
`
