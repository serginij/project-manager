import React from 'react'
import { styled } from 'linaria/react'

import { Popup } from '@ui/'

export const EditCard = ({ onClick }) => {
  let width = 50

  if (window.matchMedia('(max-width: 730px)').matches) {
    width = 95
  }

  return (
    <Popup width={width} onClick={onClick}>
      <Wrapper>
        <Header></Header>
        <h1>Edit card</h1>
        <Content></Content>
        <Aside></Aside>
      </Wrapper>
    </Popup>
  )
}

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--gray);
`

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Content = styled.section`
  width: 80%;
  display: flex;
  flex-direction: column;
`

const Aside = styled.aside`
  width: 20%;
  display: flex;
  flex-direction: column;
`
