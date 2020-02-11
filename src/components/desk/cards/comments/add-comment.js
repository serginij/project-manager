import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AddUpdateElement } from '@ui'
import { addComment, updateComment } from '@symbiotes/effects/'

export const AddComment = ({
  edit,
  value = '',
  onCancel,
  cardId,
  commentId
}) => {
  const { token } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  let handleAddComment = text => {
    dispatch(addComment(text, cardId, token))
  }

  let handleUpdateComment = (text, commentId) => {
    dispatch(updateComment(cardId, commentId, text, token))
  }

  return (
    <AddUpdateElement
      edit={edit}
      isOpen={false}
      value={value}
      onCancel={onCancel}
      elementId={commentId}
      addElement={handleAddComment}
      updateElement={handleUpdateComment}
      placeholder="Напишите комментарий..."
    />
  )
}
