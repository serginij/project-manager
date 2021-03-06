import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { useSelector, useDispatch } from 'react-redux'

import { updateCard } from '@symbiotes/effects/'
import { formatDate } from '@lib/format-date'
import { Icon } from '@ui'
import down from '@assets/chevron-down.png'

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

  let overdue = new Date().getTime() > new Date(card.deadline).getTime()

  return (
    <div>
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
            {formattedDate}{' '}
            {(checked || overdue) && (
              <Done overdue={overdue && !checked}>
                {!checked && overdue ? 'ПРОСРОЧЕНО' : 'ВЫПОЛНЕНО'}
              </Done>
            )}
            <Icon src={down} alt="" width={14} height={14} />
          </Time>
        </AddDeadline>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 2rem;
  align-items: center;
`

const Time = styled.button`
  display: flex;
  background-color: var(--secondary);
  border: none;
  font-size: 14px;
  border-radius: 3px;
  height: 100%;
  box-sizing: border-box;
  padding: 4px 10px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--secondary__dark);
  }
`

const Done = styled.p`
  background-color: ${props => (props.overdue ? 'var(--red)' : 'var(--green)')};
  color: white;
  font-size: 14px;
  margin: 3px;
  padding: 0 3px;
`

const Title = styled.h3`
  color: var(--secondary-text);
  font-size: 12px;
`
