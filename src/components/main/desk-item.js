import React from 'react'
import { styled } from 'linaria/react'

import { StyledLink } from '../../ui/styled-link'

export const DeskItem = ({ name, id, onClick }) => (
  <DeskIcon key onClick={onClick}>
    <StyledLink to={`/desks/${id}`}>
      <Name>{name}</Name>
    </StyledLink>
  </DeskIcon>
)

const DeskIcon = styled.li`
  display: flex;
  cursor: pointer;
  max-width: 48%;
  min-width: 160px;
  min-height: 100px;
  margin: 2% 8px;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: var(--dark-gray);
  border-radius: 3px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 6px -6px #777;
  }

  @media (max-width: 600px) {
    min-height: 90px;
    min-width: 130px;
  }

  @media (max-width: 400px) {
    min-height: 70px;
    min-width: 120px;
  }
`

const Name = styled.p``
