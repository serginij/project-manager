import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { AddButton } from './add-button'
import { Button } from './button'

export const SaveCancelBlock = ({ saveText, cancelText, handleCancel }) => (
  <Wrapper>
    <AddButton className={button}>
      {saveText ? saveText : 'Сохранить'}
    </AddButton>
    <Button type="button" className={closeButton} onClick={handleCancel}>
      {cancelText ? cancelText : 'Удалить'}
    </Button>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  align-items: center;
`

const button = css`
  font-size: 1rem;
  height: 2.2em;
  width: 30%;
`

const closeButton = css`
  background-color: var(--red);
  color: white;
  font-size: 1rem;
  height: 2.2em;
  width: 30%;
`
