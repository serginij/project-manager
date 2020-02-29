import React from 'react'
import { styled } from 'linaria/react'

import { AddLabel } from './feat/add-label'

export const LabelsList = ({ allLabels, cardLabels, cardId }) => {
  const labels = []
  cardLabels &&
    cardLabels.forEach(label => {
      labels.push(allLabels[label])
    })
  let list = labels.map(label => (
    <Item key={label.id}>
      <AddLabel allLabels={allLabels} cardLabels={cardLabels} cardId={cardId}>
        <ColorBlock color={label.color}>{label.name}</ColorBlock>
      </AddLabel>
    </Item>
  ))

  return (
    labels.length > 0 && (
      <div>
        <Title>МЕТКИ</Title>
        <List>
          {list}
          <Item>
            <AddLabel
              allLabels={allLabels}
              cardLabels={cardLabels}
              cardId={cardId}
            >
              <Add>+</Add>
            </AddLabel>
          </Item>
        </List>
      </div>
    )
  )
}

const List = styled.ul`
  text-decoration: none;
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`

const Item = styled.li`
  text-decoration: none;
  list-style: none;
  margin-right: 8px;
`

const Add = styled.button`
  font-weight: 200;
  -webkit-text-decoration: none;
  text-decoration: none;
  font-size: 28px;
  border-radius: 50%;
  background-color: var(--secondary);
  border: none;
  color: var(--gray-text);
  cursor: pointer;
  box-sizing: border-box;
  padding: 0;
  width: 38px;
  height: 38px;
  text-align: center;
  padding-bottom: 10px;

  &:hover {
    background-color: var(--secondary__dark);
  }
`

const Title = styled.h3`
  color: var(--secondary-text);
  font-size: 12px;
`

const ColorBlock = styled.div`
  box-sizing: border-box;
  padding: 10px 5px 0 5px;
  min-width: 46px;
  height: 38px;
  border-radius: 5px;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  background-color: ${props => props.color};
  color: white;
  cursor: pointer;
`
