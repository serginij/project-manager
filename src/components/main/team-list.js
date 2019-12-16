import React from 'react'
import { styled } from 'linaria/react'

import { StyledLink, CloseButton } from '@ui'

import { TeamItem } from './team-item'

export const TeamList = ({ teams }) => {
  let teamList =
    teams &&
    teams.map(team => (
      <TeamItem
        isAdmin={team.isAdmin}
        name={team.name}
        key={team.id}
        id={team.id}
      />
    ))

  return (
    <Wrapper>
      <Teams>
        <ListHeader>
          <h3>Команды</h3>
          <CloseButton>
            <StyledLink to="/create-team">+</StyledLink>
          </CloseButton>
        </ListHeader>
        <List>{teamList}</List>
      </Teams>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 30%;
  min-width: 200px;

  @media (max-width: 600px) {
    width: 80%;
  }
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  list-style: none;
  align-items: center;
  width: 100%;
  padding: 0;
`

const Teams = styled.aside`
  width: 50%;
  min-width: 200px;
  margin: auto;

  @media (max-width: 600px) {
    width: 80%;
    margin: 0;
  }
`

const ListHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
