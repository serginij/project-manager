import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'linaria/react'

import { addColumn, getDesk } from '@symbiotes/effects/'
import { cardsActions } from '@symbiotes/cards'

import { AddForm, Button, StyledLink, Alert } from '@ui'
import { ColumnsList } from './columns/columns-list'

export const Desk = () => {
  const { currentDesk } = useSelector(state => state.desks)
  const desk = useSelector(state => state.desks.desks[currentDesk])
  const { teams } = useSelector(state => state.teams)
  const { error } = useSelector(state => state.cards)

  let isAdmin = desk && teams && teams[desk.team_id].isAdmin

  const dispatch = useDispatch()
  const handleAddColumn = name => dispatch(addColumn(name, currentDesk))
  const reloadDesk = () => {
    dispatch(getDesk(currentDesk))
    dispatch(cardsActions.setError(null))
  }

  return (
    currentDesk && (
      <>
        <DeskHeader>
          <h2>{desk.name}</h2>
          {isAdmin && (
            <Button>
              <StyledLink to={`/desk/settings/${currentDesk}`}>
                Настройки
              </StyledLink>
            </Button>
          )}
        </DeskHeader>
        <DeskWrapper>
          <ColumnsList deskId={currentDesk} />
          <AddForm
            onAdd={handleAddColumn}
            buttonText="Добавить столбец"
            inputText="Добавить еще один столбец"
            placeholder="Название столбца"
            type="column"
          />
          {error && <Alert runEffect={reloadDesk} />}
        </DeskWrapper>
      </>
    )
  )
}

const DeskWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
  margin: 0 20px;
`

const DeskHeader = styled.header`
  display: flex;
  margin: 0 20px;
  justify-content: space-between;
  align-items: center;
`
