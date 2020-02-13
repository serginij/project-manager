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
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 60px;
  overflow-x: scroll;
  overflow-y: scroll;
  background-color: var(--secondary__light);
`

const Main = styled.div`
  --primary: #6200ea;
  --primary__light: #9d46ff;
  --primary__dark: #0a00b6;
  --primary-text: #ffffff;
  --secondary: #e0e0e0;
  --secondary__light: #f5f5f5;
  --secondary__dark: #d4d4d4;
  --secondary-text: #455a64;
  --secondary-text__dark: #000000;
  --green: #43a047;
  --red: #e53935;

  height: 100vh;
  width: 100vw;
  font-family: sans-serif;

  font-size: 16px;

  @media (max-width: 1200px) {
    font-size: 14px;
  }
`
