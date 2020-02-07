import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { useSelector, useDispatch } from 'react-redux'

import { updateCard } from '@symbiotes/effects'
import { formatDate } from '@lib/format-date'

import { Checkbox } from './check-lists/checkbox'
import { AddDeadline } from './feat/add-deadline'

export const Deadline = ({ cardId }) => {
  let card = useSelector(state => state.cards.cards[cardId])
  const [checked, setChecked] = useState(card.checked)
  const dispatch = useDispatch()

  const updateChecked = () => {
    card.checked = !checked
    dispatch(updateCard(card))
    setChecked(!checked)
  }
  let formattedDate = formatDate(new Date(card.deadline), false)
  return (
    <>
      <Title>СРОК</Title>
      <Wrapper>
        <Checkbox
          value={''}
          checked={checked}
          onChange={updateChecked}
          onClick={updateChecked}
        />
        <AddDeadline startDate={card.date}>
          <Time>
            {formattedDate} {card.checked && <Done>ВЫПОЛНЕНО</Done>}{' '}
            <Bracket>&#9001;</Bracket>
          </Time>
        </AddDeadline>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 2rem;
  align-items: center;
`

const Time = styled.button`
  display: flex;
  background-color: var(--dark-gray);
  border: none;
  font-size: 14px;
  border-radius: 3px;
  height: 100%;
  box-sizing: border-box;
  padding: 4px 10px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: var(--gray-selection);
  }
`

const Done = styled.p`
  background-color: var(--green);
  color: white;
  font-size: 14px;
  margin: 3px;
`

const Title = styled.h3`
  color: var(--gray-text);
  font-size: 12px;
`

const Bracket = styled.p`
  /* font-size: 32px; */
  margin: 8px 0 0 4px;
  transform: rotate(-90deg);
`
