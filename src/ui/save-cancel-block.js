import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { AddButton } from './add-button'
import { Button } from './button'
import { ConfirmBlock } from './confirm-block'

export const SaveCancelBlock = ({
  saveText,
  cancelText,
  handleCancel,
  handleSubmit = () => {},
  title,
  buttonText,
  className
}) => (
  <Wrapper className={className}>
    <AddButton className={button} onClick={handleSubmit}>
      {saveText ? saveText : 'Сохранить'}
    </AddButton>
    {title ? (
      <ConfirmBlock
        title={title}
        onConfirm={handleCancel}
        buttonText={buttonText}
        style={closeButton}
      >
        <Button type="button" className={closeButton}>
          {cancelText ? cancelText : 'Удалить'}
        </Button>
      </ConfirmBlock>
    ) : (
      <Button type="button" className={closeButton} onClick={handleCancel}>
        {cancelText ? cancelText : 'Удалить'}
      </Button>
    )}
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
  border-radius: 3px;

  &:hover {
    background-color: var(--red);
  }
`
