import React from 'react'
import { styled } from 'linaria/react'

import { Comment } from './comment'
import { AddComment } from './add-comment'

export const CommentsList = ({ cardId, comments }) => {
  let commentsList = comments.map(comment => (
    <Comment
      key={comment.id}
      text={comment.text}
      date={comment.date}
      name={comment.username}
      commentId={comment.id}
      cardId={cardId}
      canEdit
    />
  ))
  return (
    <Wrapper>
      <h4>Комментарии</h4>
      <AddComment cardId={cardId} />
      <List>{commentsList}</List>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

const List = styled.ul`
  width: 100%;
  padding: 0;
`
