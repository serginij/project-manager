import React from 'react'
import { styled } from 'linaria/react'
import { Header } from '@components/header'

export const CommonContent = ({ children }) => (
  <div style={{ fontFamily: 'sans-serif' }}>
    <Header />
    <Wrapper>{children}</Wrapper>
  </div>
)

const Wrapper = styled.div`
  padding-top: 60px;
  height: 100vh;
  width: 100vw;
  overflow-x: scroll;
  background-color: #fafbfc;
`
