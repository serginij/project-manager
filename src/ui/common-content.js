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
  --gray: #fafbfc;
  --light-gray: rgba(9, 30, 66, 0.04);
  --dark-gray: #dfe3e6;
  --green: #27ae60;
  --red: #e74c3c;
  --primary-color: #483d8b;

  padding-top: 60px;
  height: 100vh;
  width: 100vw;
  overflow-x: scroll;
  background-color: var(--gray);
`
