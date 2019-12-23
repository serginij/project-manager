import React from 'react'
import { styled } from 'linaria/react'

export const Comment = ({ name, date, text }) => {
  let month = date.toLocaleString('ru', { month: 'short' }).slice(0, 3)
  let day = parseInt(date.getDate())
  let year = date.getFullYear()
  let time = date.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' })
  let formattedDate = day + ' ' + month + ' ' + year + 'г. в ' + time
  return (
    <CommentItem>
      <CommentData>
        <Author>{name}</Author>
        <Date>{formattedDate}</Date>
      </CommentData>
      <Content>{text}</Content>
    </CommentItem>
  )
}

const CommentItem = styled.article``

const CommentData = styled.div`
  display: flex;
  align-items: center;
`

const Author = styled.b`
  font-size: 14px;
`

const Date = styled.p`
  color: #5e6c84;
  font-size: 12px;
`

const Content = styled.div`
  background-color: white;
  padding: 8px 12px;
  width: fit-content;
  font-size: 14px;
`
