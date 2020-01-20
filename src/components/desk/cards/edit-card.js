import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import { CommentsList } from '@components/comments/comments-list'
import { Popup, ToggleInput, CloseButton, DynamicTextarea } from '@ui/'
import { FeatBlock } from './feat/feat-block'
import { UsersList } from './feat/users-list'

import { updateCard } from '@symbiotes/effects'

export const EditCard = ({ onClick, cardId }) => {
  let width = 50
  const card = useSelector(state => state.cards.cards[cardId])

  const dispatch = useDispatch()

  const update = name => dispatch(updateCard(cardId, name))

  if (window.matchMedia('(max-width: 730px)').matches) {
    width = 95
  }

  if (window.matchMedia('(max-width: 1200px)').matches) {
    width = 60
  }

  if (window.matchMedia('(max-width: 1050px)').matches) {
    width = 80
  }
  if (window.matchMedia('(max-width: 750px)').matches) {
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
        <CloseButton onClick={onClick}>×</CloseButton>
      </Header>
      <UsersList users={card.users} />
      <Wrapper>
        <Content>
          <h4>Описание</h4>
          <DynamicTextarea
            minRows={3}
            maxRows={6}
            placeholder="Информация о задаче"
          />
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
  @media (max-width: 650px) {
    flex-direction: column;
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
  /* padding: 0 12px; */
  height: 2em;
`

const Content = styled.section`
  width: 70%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 12px;
  @media (max-width: 650px) {
    width: 90%;
  }
`

const Aside = styled.aside`
  width: 30%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /* padding-right: 18px; */
  @media (max-width: 650px) {
    width: 90%;
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
