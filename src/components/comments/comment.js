import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import { AddComment } from './add-comment'
import { deleteComment } from '@symbiotes/effects'
import { ConfirmBlock } from '@ui'

export const Comment = ({
  name,
  date,
  text,
  canEdit = false,
  commentId,
  cardId
}) => {
  date = new Date(date)
  let month = date.toLocaleString('ru', { month: 'short' }).slice(0, 3)
  let day = parseInt(date.getDate())
  let year = date.getFullYear()
  let time = date.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' })
  let formattedDate = day + ' ' + month + ' ' + year + 'г. в ' + time

  let [edit, setEdit] = useState(false)

  let { token } = useSelector(state => state.auth)

  let dispatch = useDispatch()

  let handleDeleteComment = () =>
    dispatch(deleteComment(cardId, commentId, token))

  return (
    <CommentItem>
      <CommentData>
        <Author>{name}</Author>
        <Text>{formattedDate}</Text>
      </CommentData>
      {edit ? (
        <AddComment
          edit
          value={text}
          onCancel={() => setEdit(false)}
          commentId={commentId}
        />
      ) : (
        <>
          <Content>{text}</Content>
          {canEdit && (
            <EditBlock>
              <Text className={editControl} onClick={() => setEdit(true)}>
                Изменить
              </Text>
              <ConfirmBlock
                onConfirm={handleDeleteComment}
                title="Удаление комментария"
                buttonText="Удалить комментарий"
              >
                <Text className={editControl}>Удалить</Text>
              </ConfirmBlock>
            </EditBlock>
          )}
        </>
      )}
    </CommentItem>
  )
}

const CommentItem = styled.li`
  list-style: none;
`

const CommentData = styled.div`
  display: flex;
  align-items: baseline;
`

const Author = styled.b`
  font-size: 14px;
`

const Text = styled.p`
  color: #5e6c84;
  font-size: 12px;
  margin-left: 12px;
`

const Content = styled.div`
  background-color: white;
  padding: 8px 12px;
  width: fit-content;
  font-size: 14px;
`

const EditBlock = styled.div`
  display: flex;
`

const editControl = css`
  cursor: pointer;
`
