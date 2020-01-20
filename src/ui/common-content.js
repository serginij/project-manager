import React from 'react'
import { styled } from 'linaria/react'
import { Header } from '@components/header'

export const CommonContent = ({ children }) => (
  <Main>
    <Header />
    <Wrapper>{children}</Wrapper>
  </Main>
)

const Wrapper = styled.div`
  --gray: #fafbfc;
  --light-gray: rgba(9, 30, 66, 0.04);
  --dark-gray: #ebecf0;
  --gray-selection: rgba(9, 30, 66, 0.08);
  --gray-background: #f4f5f6;
  --green: #27ae60;
  --red: #e74c3c;
  --primary-color: #483d8b;
  --gray-text: #5e6c84;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 60px;
  overflow-x: scroll;
  overflow-y: scroll;
  background-color: var(--gray);
`

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  font-family: sans-serif;
`
