import { desksActions } from '@symbiotes/desks'
import { columnsActions } from '@symbiotes/columns'
import { cardsActions } from '@symbiotes/cards'

export const addColumn = (name, deskId) => {
  return dispatch => {
    let id = Math.floor(Math.random() * 500)
    dispatch(columnsActions.addColumn({ name: name, id: id }))
    dispatch(desksActions.addColumn(deskId, id))
  }
}

export const addCard = (name, columnId) => {
  return dispatch => {
    let id = Math.floor(Math.random() * 500)
    dispatch(cardsActions.addCard({ name: name, id: id }))
    dispatch(columnsActions.addCard(columnId, id))
  }
}
