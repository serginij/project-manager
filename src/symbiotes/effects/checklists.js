import { cardsActions } from '@symbiotes/cards'

import { post, del, update } from '@lib/request'

export const addList = (cardId, name, token) => {
  return dispatch => {
    dispatch(
      cardsActions.addList(cardId, { name: name, id: 'some-id', items: [] })
    )
    return post(`/cards/${cardId}/checklists`, { name: name }, token)
      .then(res => {
        dispatch(cardsActions.updateList(cardId, 'some-id', { id: res.id }))
      })
      .catch(err => console.log(err))
  }
}

export const updateList = (cardId, listId, name, token) => {
  return dispatch => {
    cardsActions.updateList(cardId, listId, { name: name, id: listId })
    return update(`/checklist/${listId}`, { name: name }, token).catch(err => {
      dispatch(cardsActions.setError(err))
      console.log(err)
    })
  }
}

export const deleteList = (cardId, listId, token) => {
  return dispatch => {
    dispatch(cardsActions.deleteList(cardId, listId))
    return del(`/checklist/${listId}`, {}, token).catch(err => {
      dispatch(cardsActions.setError(err))
      console.log(err)
    })
  }
}

export const addItem = (cardId, listId, text, token) => {
  return dispatch => {
    dispatch(
      cardsActions.addItem(cardId, listId, {
        id: 'some-text',
        text: text,
        checked: false
      })
    )
    return post(`/checklist/${listId}/items`, { text: text }, token)
      .then(res => {
        dispatch(
          cardsActions.updateItem(cardId, listId, 'some-text', {
            id: res.id
          })
        )
      })
      .catch(err => {
        dispatch(cardsActions.setError(err))
        console.log(err)
      })
  }
}

export const updateItem = (cardId, listId, item, token) => {
  return dispatch => {
    dispatch(
      cardsActions.updateItem(cardId, listId, item.id, {
        text: item.text,
        id: item.id,
        checked: item.checked
      })
    )
    return update(
      `/checkitem/${item.id}`,
      { text: item.text, checked: item.checked },
      token
    ).catch(err => {
      dispatch(cardsActions.setError(err))
      console.log(err)
    })
  }
}

export const deleteItem = (cardId, listId, itemId, token) => {
  return dispatch => {
    dispatch(cardsActions.deleteItem(cardId, listId, itemId))
    return del(`/checkitem/${itemId}`, {}, token).catch(err => {
      dispatch(cardsActions.setError(err))
      console.log(err)
    })
  }
}
