import { desksActions } from '@symbiotes/desks'
import { columnsActions } from '@symbiotes/columns'
import { cardsActions } from '@symbiotes/cards'
import { teamsActions } from '@symbiotes/teams'

export const addColumn = (name, deskId, columnId) => {
  return dispatch => {
    dispatch(columnsActions.addColumn({ name: name, id: columnId }))
    dispatch(desksActions.addColumn(deskId, columnId))
  }
}

export const addCard = (name, columnId, cardId) => {
  return dispatch => {
    dispatch(cardsActions.addCard({ name: name, id: cardId }))
    dispatch(columnsActions.addCard(columnId, cardId))
  }
}

export const addDesk = (name, teamId, deskId) => {
  return dispatch => {
    dispatch(desksActions.addDesk({ name: name, id: deskId }))
    dispatch(teamsActions.addDesk(teamId, deskId))
  }
}
