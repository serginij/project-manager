import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector } from 'react-redux'

import { CommentsList } from '@components/comments/comments-list'
import { Popup, ToggleInput, CloseButton, DynamicTextarea } from '@ui/'

export const EditCard = ({ onClick, cardId }) => {
  let width = 50
  const card = useSelector(state => state.cards.cards[cardId])

  if (window.matchMedia('(max-width: 730px)').matches) {
    width = 95
  }

  if (window.matchMedia('(max-width: 1200px)').matches) {
    width = 60
  }

  if (window.matchMedia('(max-width: 1050px)').matches) {
    width = 80
  }

  return (
    <Popup width={width} onClick={onClick}>
      <Header>
        <ToggleInput text="Edit">
          <Name>{card.name}</Name>
        </ToggleInput>
        <CloseButton className={closeButton} onClick={onClick}>
          ×
        </CloseButton>
      </Header>
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
          <h4>Информация</h4>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
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
`

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--gray-background);
  border-radius: 3px;
`

const Content = styled.section`
  width: 70%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 18px;
`

const Aside = styled.aside`
  width: 30%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-right: 18px;
`

const closeButton = css`
  margin-right: 12px;
`

const Name = styled.h3`
  font-weight: bold;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  margin: 12px 0 13px 18px;
  cursor: pointer;
  &:last-child {
    padding-bottom: 0;
  }
`
