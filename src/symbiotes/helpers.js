import { desksActions } from '@symbiotes/desks'
import { columnsActions } from '@symbiotes/columns'
import { cardsActions } from '@symbiotes/cards'
import { teamsActions } from '@symbiotes/teams'

export const addColumn = (name, deskId, columnId) => {
  return dispatch => {
    // let id = Math.floor(Math.random() * 500)
    dispatch(columnsActions.addColumn({ name: name, id: columnId }))
    dispatch(desksActions.addColumn(deskId, columnId))
  }
}

export const addCard = (name, columnId) => {
  return dispatch => {
    let id = Math.floor(Math.random() * 500)
    dispatch(cardsActions.addCard({ name: name, id: id }))
    dispatch(columnsActions.addCard(columnId, id))
  }
}

export const addDesk = (name, teamId, deskId) => {
  return dispatch => {
    // let id = Math.floor(Math.random() * 500)
    dispatch(desksActions.addDesk({ name: name, id: deskId }))
    dispatch(teamsActions.addDesk(teamId, deskId))
  }
}
