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
  buttonText,
  style
}) => {
  let [visible, setVisible] = useState(false)
  let [data, setData] = useState({ width: width, offsetTop: 0, x: 0, y: 0 })

  const handleClick = e => {
    e.stopPropagation()
    let { x, y, width, height, top } = e.target.getBoundingClientRect()
    let { innerHeight, innerWidth } = window
    x = x + data.width > innerWidth ? (x -= data.width) : x
    y = y + 130 > innerHeight ? (y -= 130) : y + height

    setData({
      x: x,
      y: y,
      width: data.width ? data.width : width,
      offsetTop: e.target.offsetTop - top
    })
    setVisible(!visible)
  }

  const handleClose = e => {
    e.stopPropagation()
    setVisible(close)
  }

  return (
    <>
      <WrapButton type="button" onClick={handleClick} className={style}>
        {children}
      </WrapButton>
      <BackDrop top={data.offsetTop} visible={visible} onClick={handleClose}>
        <Wrapper
          visible={visible}
          width={data.width}
          x={data.x}
          y={data.y}
          onBlur={handleClose}
        >
          <Header>
            <Name>{title}</Name>
            <CloseButton
              type="button"
              onClick={handleClose}
              className={cancelButton}
            />
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

const WrapButton = styled.div`
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
  top: ${props => props.top}px;
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
  z-index: 1;
  background-color: white;
`

const styledButton = css`
  background-color: var(--red);
  color: white;

  &:hover {
    background-color: var(--red);
  }
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
border-bottom: 1px solid var(--secondary)
`
