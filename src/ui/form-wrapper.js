import { styled } from 'linaria/react'

export const FormWrapper = styled.div`
  width: 30%;
  margin: auto;
  margin-top: 5%;
  text-align: center;
  min-width: 270px;
  max-width: 500px;
  @media (max-width: 1500px) {
    width: 50%;
  }
  @media (max-width: 750px) {
    width: 70%;
  }
  @media (max-width: 500px) {
    width: 90%;
  }
  @media (max-width: 320px) {
    width: 95%;
  }
`
