import { cardsActions } from '@symbiotes/cards'

import { post, del, update } from '@lib/request'

export const addComment = (text, cardId, token) => {
  let date = new Date()
  return dispatch => {
    dispatch(
      cardsActions.addComment(
        {
          text,
          card_id: cardId,
          user_id: 'id',
          id: 'some-id',
          date: date,
          username: 'user'
        },
        cardId
      )
    )
    return post(`/cards/${cardId}/comments`, { text, date: date }, token)
      .then(res => {
        console.log('addComment', res)
        dispatch(
          cardsActions.updateComment(cardId, 'some-id', {
            id: res.id,
            user_id: res.user_id,
            username: res.username
          })
        )
      })
      .catch(err => {
        dispatch(cardsActions.setError(err))
        console.log(err)
      })
  }
}

export const deleteComment = (cardId, commentId, token) => {
  return dispatch => {
    dispatch(cardsActions.deleteComment(cardId, commentId))
    return del(`/comments/${commentId}`, {}, token).catch(err => {
      dispatch(cardsActions.setError(err))
      console.log(err)
    })
  }
}

export const updateComment = (cardId, commentId, text, token) => {
  return dispatch => {
    dispatch(cardsActions.updateComment(cardId, commentId, { text: text }))
    return update(`/comments/${commentId}`, { text }, token).catch(err => {
      dispatch(cardsActions.setError(err))
      console.log(err)
    })
  }
}
