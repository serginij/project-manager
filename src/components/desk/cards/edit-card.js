import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import { CommentsList } from './comments/comments-list'
import { Popup, ToggleInput, CloseButton, DynamicTextarea } from '@ui/'
import { FeatBlock } from './feat/feat-block'
import { UsersList } from './feat/users-list'
import { Checklists } from './checklists'
import { Deadline } from './deadline'

import { updateCard } from '@symbiotes/effects'

//Add desc updating with backend request

export const EditCard = ({ onClick, cardId }) => {
  let width = 50
  const card = useSelector(state => state.cards.cards[cardId])

  const dispatch = useDispatch()

  const update = name => {
    card.name = name
    dispatch(updateCard(card))
  }

  if (window.matchMedia('(max-width: 730px)').matches) {
    width = 95
  }
  if (window.matchMedia('(max-width: 1200px)').matches) {
    width = 60
  }
  if (window.matchMedia('(max-width: 1050px)').matches) {
    width = 90
  }
  if (window.matchMedia('(max-width: 850px)').matches) {
    width = 70
  }
  if (window.matchMedia('(max-width: 500px)').matches) {
    width = 90
  }

  return (
    <Popup className={popupStyle} width={width} onClick={onClick}>
      <Header>
        <ToggleInput
          onSubmit={update}
          text={card.name}
          inputStyle={inputStyle}
        />
        <CloseButton onClick={onClick} />
      </Header>
      <Wrapper>
        <Content>
          <UsersList users={card.users} />
          <h4>Описание</h4>
          <DynamicTextarea
            minRows={3}
            maxRows={6}
            placeholder="Информация о задаче"
          />
          {card.deadline && <Deadline cardId={cardId} />}
          <Checklists cardId={cardId} />
          <CommentsList cardId={cardId} comments={card.comments} />
        </Content>
        <Aside>
          <FeatBlock />
        </Aside>
      </Wrapper>
    </Popup>
  )
}

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--gray-background);
  display: flex;
  border-radius: 3px;
  justify-content: space-between;
  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
  }
`

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--gray-background);
  border-radius: 3px;
  box-sizing: border-box;
  align-items: flex-start;
  height: 2em;
`

const Content = styled.section`
  width: 70%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 12px;
  @media (max-width: 850px) {
    width: 100%;
    padding: 0;
  }
`

const Aside = styled.aside`
  width: 200px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  @media (max-width: 850px) {
    width: 100%;
  }
`

const inputStyle = css`
  font-size: 15px;
  font-weight: bold;
  height: 2em;
`

const popupStyle = css`
  background-color: var(--gray-background);
  box-sizing: border-box;
  padding: 12px;
`
