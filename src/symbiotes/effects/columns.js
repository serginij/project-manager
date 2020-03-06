import { desksActions } from '@symbiotes/desks'
import { cardsActions } from '@symbiotes/cards'

import { post, del } from '@lib/request'

import { addColumn as createColumn } from '../helpers'

export const addColumn = (name, deskId) => {
  return dispatch => {
    return post('/desks/columns', {
      name: name,
      deskId: deskId
    })
      .then(res => {
        dispatch(createColumn(name, deskId, res.id))
      })
      .catch(err => console.log(err))
  }
}

export const deleteColumn = columnId => {
  return dispatch => {
    return del(`/desks/columns/${columnId}`).then(() => {
      dispatch(desksActions.deleteColumn(columnId))
    })
  }
}

export const moveColumn = (deskId, columns, token) => {
  return dispatch => {
    dispatch(desksActions.updateDesk({ id: deskId, columns: columns }))
    return post(
      `/desks/${deskId}/moveColumn`,
      { columns: columns },
      token
    ).catch(err => {
      dispatch(cardsActions.setError(err))
    })
  }
}
