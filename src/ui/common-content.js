import React from 'react'
import { styled } from 'linaria/react'
import { Header } from '@components/header'

export const CommonContent = ({ children }) => (
  <>
    <Header />
    <Wrapper>{children}</Wrapper>
  </>
)

const Wrapper = styled.div`
  margin-top: 60px;
`
