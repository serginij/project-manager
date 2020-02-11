import React, { useState, useRef, useEffect } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { CloseButton } from '@ui'

export const Dropdown = ({
  children,
  width,
  content,
  align,
  close = true,
  header
}) => {
  let [visible, setVisible] = useState(false)
  let [data, setData] = useState({ width: width, offsetTop: 0, x: 0, y: 0 })

  const bodyRef = useRef(null)
  useEffect(() => {
    let height = bodyRef.current.clientHeight
    let { innerHeight } = window

    let y = data.y + height > innerHeight ? data.y - height : data.y

    setData(prev => ({ ...prev, y: y }))
  }, [data.y, visible])

  const handleClick = e => {
    let { x, y, width, height, top } = e.target.getBoundingClientRect()
    let { innerHeight, innerWidth } = window

    x = align ? x - data.width / 2 + width / 2 : x
    x =
      x + data.width > innerWidth ? (x -= x + data.width - innerWidth + 50) : x
    y =
      y + height > innerHeight
        ? (y -= y + height - innerHeight + 50)
        : y + height

    setData({
      x: x,
      y: y,
      width: data.width ? data.width : width,
      offsetTop: e.target.offsetTop - top
    })

    setVisible(true)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setVisible(false)
  }

  return (
    <Wrapper>
      <Header onClick={handleClick}>{children}</Header>
      <Backdrop
        top={data.offsetTop}
        tabIndex={-1}
        visible={visible}
        onClick={() => {
          setVisible(false)
          console.log('click backdrop')
        }}
      >
        <Body
          onMouseLeave={close ? () => setVisible(false) : null}
          onClick={e => e.stopPropagation()}
          visible={visible}
          x={data.x}
          y={data.y}
          width={data.width}
          onSubmit={handleSubmit}
          tabIndex={-1}
          ref={bodyRef}
        >
          {header && (
            <ContentHeader>
              {header}
              <CloseButton
                tabIndex={0}
                type="button"
                onClick={() => setVisible(false)}
                className={closeButton}
              />
            </ContentHeader>
          )}
          {content}
        </Body>
      </Backdrop>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Backdrop = styled.div`
  left: 0;
  top: ${props => props.top + 'px'};
  display: ${props => (props.visible ? 'block' : 'none')};
  z-index: 3;
  position: absolute;
  width: 100%;
  /* min-height: 100vh; */
  height: 100vh;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0);
`

const Header = styled.div``

const Body = styled.form`
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
  z-index: 4;
`

const ContentHeader = styled.header`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--dark-gray);
  box-sizing: border-box;
  margin: 0 12px;
  margin-bottom: 8px;
`

const closeButton = css`
  font-size: 24px;
  font-weight: 200;
`
