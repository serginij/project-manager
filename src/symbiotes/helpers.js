import { desksActions } from '@symbiotes/desks'
import { columnsActions } from '@symbiotes/columns'
import { cardsActions } from '@symbiotes/cards'
import { teamsActions } from '@symbiotes/teams'
import { authActions } from '@symbiotes/auth'

import { history } from '@lib/routing'

export const addColumn = (name, deskId, columnId) => {
  return dispatch => {
    dispatch(columnsActions.addColumn({ name: name, id: columnId }))
    dispatch(desksActions.addColumn(deskId, columnId))
  }
}

export const addCard = (name, columnId, cardId) => {
  return dispatch => {
    dispatch(
      cardsActions.addCard({ name: name, id: cardId, column_id: columnId })
    )
    dispatch(columnsActions.addCard(columnId, cardId))
  }
}

export const addDesk = (name, teamId, deskId) => {
  return dispatch => {
    dispatch(desksActions.addDesk({ name: name, id: deskId }))
    dispatch(teamsActions.addDesk(teamId, deskId))
  }
}

export const storeToken = token => {
  sessionStorage.setItem('token', token)
}

export const getToken = () => {
  const token = sessionStorage.getItem('token')

  return dispatch => {
    if (token) {
      dispatch(authActions.login(token))
    } else {
      dispatch(authActions.login('empty'))
    }
  }
}

export const logout = () => {
  sessionStorage.removeItem('token')
  return dispatch => {
    dispatch(authActions.logout())
  }
}

export const deleteDesk = (teamId, deskId) => {
  return dispatch => {
    dispatch(teamsActions.deleteDesk(teamId, deskId))
    dispatch(desksActions.deleteDesk(deskId))
  }
}

export const deleteLabel = (deskId, labelId) => {
  return dispatch => {
    dispatch(desksActions.deleteLabel(deskId, labelId))
    dispatch(cardsActions.deleteDeskLabel(labelId))
  }
}

export const parseDesk = (teamId, desk, columns, cards) => {
  return dispatch => {
    dispatch(teamsActions.addDesk(teamId, desk.id))
    dispatch(desksActions.addDesk(desk))
    dispatch(columnsActions.getColumns.done(columns))
    dispatch(cardsActions.getCards.done(cards))
    dispatch(desksActions.setCurrentDesk(desk.id))
    history.push(`/desks/${desk.id}`)
  }
}
