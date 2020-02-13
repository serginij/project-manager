import { desksActions } from '@symbiotes/desks'
import { cardsActions } from '@symbiotes/cards'

import { post, del, update } from '@lib/request'

export const addLabel = (deskId, label) => {
  return dispatch => {
    dispatch(
      desksActions.addLabel(deskId, {
        id: 'some-id',
        name: label.name,
        color: label.color
      })
    )
    return post(`/desks/${deskId}/labels`, {
      name: label.name,
      color: label.color
    })
      .then(res => {
        dispatch(desksActions.updateLabel(deskId, 'some-id', { id: res.id }))
      })
      .catch(err => {
        console.log('addLabel', err)
        dispatch(cardsActions.setError(err))
      })
  }
}

export const updateLabel = (deskId, label) => {
  return dispatch => {
    dispatch(desksActions.updateLabel(deskId, label.id, label))
    return update(`/labels/${label.id}`, {
      label: {
        name: label.name,
        color: label.color
      }
    }).catch(err => {
      console.log('updateLabel', err)
      dispatch(cardsActions.setError(err))
    })
  }
}

export const deleteLabel = (deskId, labelId) => {
  return dispatch => {
    dispatch(desksActions.deleteLabel(deskId, labelId))
    return del(`/labels/${labelId}`).catch(err => {
      console.log('deleteLabel', err)
      dispatch(cardsActions.setError(err))
    })
  }
}

export const addCardLabel = (cardId, label) => {
  return dispatch => {
    dispatch(cardsActions.addLabel(cardId, label))
    return post(`/cards/${cardId}/labels`, {
      labelId: label
    }).catch(err => {
      console.log('addCardLabel', err)
      dispatch(cardsActions.setError(err))
    })
  }
}

export const deleteCardLabel = (cardId, labelId) => {
  return dispatch => {
    dispatch(cardsActions.deleteLabel(cardId, labelId))
    return del(`/cards/${cardId}/labels/${labelId}`).catch(err => {
      console.log('deleteCardLabel', err)
      dispatch(cardsActions.setError(err))
    })
  }
}
