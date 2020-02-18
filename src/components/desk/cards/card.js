import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useDispatch, useSelector } from 'react-redux'

import { EditIcon } from '@ui'
import { EditCard } from './edit-card'

import { cardsActions } from '@symbiotes/cards'
import { formatDate } from '@lib/format-date'
import { getProgress } from '@lib/get-progress'

import comment from '@assets/comment.png'
import time from '@assets/time.png'
import check from '@assets/check.png'

export const Card = ({ text, id, card }) => {
  const [visible, setVisible] = useState(false)
  const [edit, setEdit] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const allLabels = useSelector(
    state => state.desks.desks[state.desks.currentDesk].labels
  )
  let formattedDate = formatDate(new Date(card.deadline), false)
    .split(' ')
    .slice(0, 2)
    .join(' ')

  let progress = getProgress(card.checklists)

  const labels = []
  card &&
    card.labels.forEach(label => {
      allLabels[label] && labels.push(allLabels[label])
    })

  const dispatch = useDispatch()

  const setCurrent = id => dispatch(cardsActions.setCurrent(id))

  const handleClick = () => {
    setEdit(!edit)
    setCurrent(id)
  }

  let list = labels.map(label => (
    <Item key={label.id}>
      <ColorBlock color={label.color}>{label.name}</ColorBlock>
    </Item>
  ))

  const showEdit = e => {
    if (!document.ontouchstart) {
      if (e.target.tagName == 'LI') {
        let { x, y, width } = e.target.getBoundingClientRect()
        setPosition({ x: x + width - 30, y: y })
        setVisible(true)
      } else {
        let { x, y, width } = e.target.parentElement.getBoundingClientRect()
        setPosition({ x: x + width - 30, y: y })
        setVisible(true)
      }
    }
  }

  return (
    <Wrapper
      onMouseEnter={showEdit}
      onMouseLeave={() => setVisible(false)}
      onClick={handleClick}
    >
      {!!labels.length && <List>{list}</List>}
      <Text>{text}</Text>
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
      <EditIcon
        visible={visible}
        size={14}
        className={editIcon}
        x={position.x}
        y={position.y}
      />
      {edit && (
        <EditCard allLabels={allLabels} cardId={id} onClick={handleClick} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #ffffff;
  min-height: 2.5rem;
  border: none;
  border-radius: 3px;
  margin-bottom: 8px;
  padding: 0 8px;
  padding-right: 4px;
  box-sizing: border-box;
  word-wrap: break-word;
  max-width: 276px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: var(--secondary__light);
    /* opacity: 0.7; */
  }
`

const Text = styled.p`
  padding: 5px 0;
  width: 100%
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  word-break: break-all;

  &:first-child {
    margin-top: 2px;
  }

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

const List = styled.ul`
  text-decoration: none;
  list-style: none;
  padding: 0;
  margin-top: 8px;
  width: 100%;
  display: flex;
`

const Item = styled.li`
  text-decoration: none;
  list-style: none;
  margin-right: 4px;
`

const ColorBlock = styled.div`
  box-sizing: border-box;
  padding: 0 5px;
  min-width: 40px;
  height: 16px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 13px;
  text-align: center;
  background-color: ${props => '#' + props.color};
  color: white;
  cursor: pointer;
`

const editIcon = css`
  box-sizing: content-box;
  position: absolute;
  padding: 6px;
  padding-bottom: 4px;
  opacity: 0.7;
  margin-top: 4px;

  img {
    width: 100%;
    height: 100%;
  }
`
