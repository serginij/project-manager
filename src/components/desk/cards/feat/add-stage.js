import React from 'react'
import { styled } from 'linaria/react'
import { useDispatch } from 'react-redux'

import { Dropdown, CheckIcon } from '@ui'
import { updateCard } from '@symbiotes/effects'
import { stages } from '@lib/constants'

export const AddStage = ({ children, card }) => {
  const dispatch = useDispatch()

  const handleAddStage = id => {
    console.log(id, card)
    let newCard = { ...card }
    newCard.stage = id
    dispatch(updateCard(newCard))
  }

  const stagesList = stages.map(stage => (
    <StageBlock tabIndex={0} key={stage.id}>
      <Stage color={stage.color} onClick={() => handleAddStage(stage.id)}>
        {stage.name}
        <CheckIcon checked={stage.id === card.stage} size={16} thickness={3} />
      </Stage>
    </StageBlock>
  ))
  return (
    <Dropdown
      width={300}
      close={false}
      header={<Title>Стадия проекта</Title>}
      content={<Stages>{stagesList}</Stages>}
    >
      {children}
    </Dropdown>
  )
}

const Title = styled.p`
  color: var(--secondary-text);
  font-size: 14px;
  text-align: center;
  width: 100%;
`

const Stages = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  /* margin-bottom: 10px; */
`

const StageBlock = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 6px 10px;
  cursor: pointer;
`

const Stage = styled.div`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 700;
  height: 2.5em;
  background-color: ${props => props.color};
  color: white;
`
