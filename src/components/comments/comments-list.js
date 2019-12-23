import React from 'react'
import { styled } from 'linaria/react'

import { Comment } from './comment'

export const CommentsList = () => {
  let testComments = [
    { name: 'Andy', date: new Date(Date.now()), text: 'Hey there' },
    {
      name: 'Woodie',
      date: new Date(Date.now() - 100000000),
      text: 'Testing comments section'
    }
  ]

  let comments = testComments.map(comment => (
    <Comment
      key={comment.date}
      text={comment.text}
      date={comment.date}
      name={comment.name}
    />
  ))
  return (
    <Wrapper>
      <h4>Комментарии</h4>
      <List>{comments}</List>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

const List = styled.ul`
  width: 100%;
  pading: ;
`
