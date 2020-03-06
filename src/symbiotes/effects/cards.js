import { columnsActions } from '@symbiotes/columns'
import { cardsActions } from '@symbiotes/cards'

import { post, del, update } from '@lib/request'

import { addCard as createCard } from '../helpers'

export const addCard = (name, columnId) => {
  return dispatch => {
    return post('/desks/cards', {
      name: name,
      columnId: columnId
    })
      .then(res => {
        dispatch(createCard(name, columnId, res.id))
      })
      .catch(err => console.log(err))
  }
}

export const deleteCard = (columnId, cardId) => {
  return dispatch => {
    return del(`/desks/cards/${cardId}`).then(() => {
      dispatch(columnsActions.deleteCard(columnId, cardId))
    })
  }
}

export const updateCard = card => {
  return dispatch => {
    dispatch(cardsActions.editCard(card))
    return update(`/desks/cards/${card.id}`, {
      card
    }).catch(err => {
      dispatch(cardsActions.setError(err.message))
      console.log(err)
    })
  }
}

export const updateColumn = (id, name, token) => {
  return dispatch => {
    return update(`/desks/columns/${id}`, { name }, token)
      .then(() => {
        dispatch(columnsActions.updateColumn(id, name))
      })
      .catch(err => console.log('updateColumn', err))
  }
}

export const addCardUser = (cardId, userId, token) => {
  return dispatch => {
    return post(`/cards/${cardId}/users`, { userId: userId }, token)
      .then(res => {
        dispatch(
          cardsActions.addUser(cardId, { id: userId, username: res.username })
        )
      })
      .catch(err => console.log(err))
  }
}

export const deleteCardUser = (cardId, userId, token) => {
  return dispatch => {
    return del(`/cards/${cardId}/users/${userId}`, {}, token)
      .then(() => {
        dispatch(cardsActions.deleteUser(cardId, userId))
      })
      .catch(err => console.log(err))
  }
}

export const moveCard = (
  cardId,
  fromCol,
  toCol,
  cards,
  index,
  token,
  columns
) => {
  return dispatch => {
    dispatch(columnsActions.getColumns.done(columns))
    return post(
      `/cards/${cardId}/moveCard`,
      { fromCol: fromCol, toCol: toCol, cards: cards, index: index },
      token
    ).catch(err => {
      dispatch(cardsActions.setError(err))
    })
  }
}
