import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { addColumn, getDesk, getMindmap } from '@symbiotes/effects/'
import { cardsActions } from '@symbiotes/cards'

import { AddForm, Button, StyledLink, Alert, Spinner } from '@ui'
import { ColumnsList } from './columns/columns-list'
import { history } from '@lib/routing'

export const Desk = () => {
  const { currentDesk, desks } = useSelector(state => state.desks)
  const desk = useSelector(state => state.desks.desks[currentDesk])
  const { teams } = useSelector(state => state.teams)
  const { error, cards } = useSelector(state => state.cards)
  const { columns } = useSelector(state => state.columns)

  let isAdmin = desk && teams && teams[desk.team_id].isAdmin

  const dispatch = useDispatch()
  const handleAddColumn = name => dispatch(addColumn(name, currentDesk))
  const reloadDesk = () => {
    dispatch(getDesk(currentDesk))
    dispatch(cardsActions.setError(null))
  }

  useEffect(() => {
    if (!Object.keys(desks).length) {
      history.push('/')
    }
  }, [desks])

  const handleGetMindmap = () => {
    dispatch(getMindmap(desk, columns, cards)).then(() =>
      history.push('/mindmap')
    )
  }

  return desk ? (
    <>
      <DeskHeader>
        <h2>{desk.name}</h2>
        <div>
          <Button className={buttonStyle}>
            <StyledLink to="/stats">Анализ</StyledLink>
          </Button>
          {window.matchMedia('(min-width: 500px)').matches && (
            <Button onClick={handleGetMindmap}>И-карта</Button>
          )}
          {isAdmin && (
            <Button className={buttonStyle}>
              <StyledLink to={`/desk/settings/${currentDesk}`}>
                Настройки
              </StyledLink>
            </Button>
          )}
        </div>
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
  ) : (
    <Spinner className={spinnerStyle} />
  )
}

const DeskWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  padding: 0 20px;
`

const DeskHeader = styled.header`
  display: flex;
  margin-left: 20px;
  margin-right: 10px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 500px) {
    margin-right: 0;
  }
  @media (max-width: 390px) {
    flex-direction: column-reverse;
  }
`

const spinnerStyle = css`
  margin: 50px 0 0 100px;
`

const buttonStyle = css`
  padding: 0;
  height: 28px;
`
