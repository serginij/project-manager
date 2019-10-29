import { desksActions } from '@symbiotes/desks'
import { columnsActions } from '@symbiotes/columns'

export const addColumn = (name, deskId) => {
  return dispatch => {
    let id = Math.floor(Math.random() * 500)
    dispatch(columnsActions.addColumn({ name: name, id: id }))
    dispatch(desksActions.addColumn(deskId, id))
  }
}
