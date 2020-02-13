import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { useDispatch } from 'react-redux'

import { EditIcon } from '@ui'
import { EditCard } from './edit-card'

import { cardsActions } from '@symbiotes/cards'
import { formatDate } from '@lib/format-date'
import { getProgress } from '@lib/get-progress'

import comment from '@assets/comment.png'
import time from '@assets/time.png'
import check from '@assets/check.png'

export const Card = ({ text, id, card }) => {
  const [visible, setVisible] = useState(true)
  const [edit, setEdit] = useState(false)

  const handleHover = () => {
    setVisible(!visible)
  }

  const dispatch = useDispatch()

  const setCurrent = id => dispatch(cardsActions.setCurrent(id))

  const handleClick = () => {
    setEdit(!edit)
    setCurrent(id)
    setVisible(true)
  }

  let formattedDate = formatDate(new Date(card.deadline), false)
    .split(' ')
    .slice(0, 2)
    .join(' ')

  let progress = getProgress(card.checklists)
  // console.log(!!card.comments.length)
  return (
    <Wrapper
      onMouseEnter={handleHover}
      onMouseLeave={() => setVisible(true)}
      onClick={handleClick}
    >
      <Text>
        {text}
        <EditIcon size={32} />
      </Text>
      <InfoBlock>
        {card.deadline && (
          <InfoItem>
            <Icon src={time} alt="deadline" />
            {formattedDate}
          </InfoItem>
        )}
        {!!card.comments.length && (
          <InfoItem>
            <Icon src={comment} alt="comments" />
            {card.comments.length}
          </InfoItem>
        )}
        {!!progress.total && (
          <InfoItem>
            <Icon src={check} alt="checkitem" />
            {progress.value + '/' + progress.total}
          </InfoItem>
        )}
      </InfoBlock>
      {edit && <EditCard cardId={id} onClick={handleClick} />}
    </Wrapper>
  )
}

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #ffffff;
  min-height: 2.5rem;
  border: none;
  border-radius: 3px;
  margin-bottom: 8px;
  padding: 0 12px;
  padding-right: 4px;
  box-sizing: border-box;
  word-wrap: break-word;
  max-width: 276px;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
`

const Text = styled.p`
  padding: 8px 0;
  width: 100%
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  word-break: break-all;
`

const InfoBlock = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
`

const InfoItem = styled.p`
  display: flex;
  justify-content: space-between;
  width: fit-content;
  color: var(--secondary-text);
  margin: 0 10px 8px 0;
  opacity: 0.9;
`

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`
