import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import { CommentsList } from './comments/comments-list'
import { Popup, ToggleInput, CloseButton, AddUpdateElement } from '@ui/'
import { FeatBlock } from './feat/feat-block'
import { UsersList } from './feat/users-list'
import { Checklists } from './checklists'
import { Deadline } from './deadline'
import { Progress } from './progress'
import { LabelsList } from './labels-list'
import { Stage } from './stage'

import { updateCard } from '@symbiotes/effects/'

export const EditCard = ({ onClick, cardId, allLabels }) => {
  let width = 50

  const card = useSelector(state => state.cards.cards[cardId])

  const dispatch = useDispatch()

  const update = name => {
    card.name = name
    dispatch(updateCard(card))
  }

  const updateDesc = text => {
    card.desc = text
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
          <LabelsList
            cardId={card.id}
            allLabels={allLabels}
            cardLabels={card.labels}
          />
          <InfoBlock>
            {card.deadline && <Deadline cardId={cardId} />}
            {card.stage && <Stage id={card.stage} />}
          </InfoBlock>
          <Progress lists={card.checklists} />
          <h4>Описание</h4>
          <AddUpdateElement
            edit
            isOpen={false}
            value={card.desc || ''}
            closable
            elementId={card.id}
            updateElement={updateDesc}
            className={descStyle}
            placeholder="Информация о задаче"
            minRows={3}
            maxRows={6}
          />
          <Checklists cardId={cardId} />
          <CommentsList cardId={cardId} comments={card.comments} />
        </Content>
        <Aside>
          <FeatBlock allLabels={allLabels} cardLabels={card.labels} />
        </Aside>
      </Wrapper>
    </Popup>
  )
}

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--secondary__light);
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
  background-color: var(--secondary__light);
  border-radius: 3px;
  box-sizing: border-box;
  align-items: center;
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
  background-color: var(--secondary__light);
  box-sizing: border-box;
  padding: 12px;
`

const descStyle = css`
  background-color: inherit;
  width: 100%;
  margin: 0;

  textarea {
    margin-top: 0;
    background-color: var(--secondary);
    transition: background-color 0.3s ease;
    &::placeholder {
      color: var(--secondary-text);
    }

    &:hover {
      background-color: var(--secondary__dark);
    }

    &:focus {
      background-color: white;
      &::placeholder {
        color: grey;
      }

      &:hover {
        background-color: white;
      }
    }
  }

  button {
    margin-left: 0;
  }
`

const InfoBlock = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
