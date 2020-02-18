import React from 'react'
import { styled } from 'linaria/react'
import { useSelector } from 'react-redux'

import { Column } from './column'

export const ColumnsList = ({ deskId }) => {
  const allColumns = useSelector(state => state.desks.desks[deskId].columns)

  const columns =
    allColumns && allColumns.map(id => <Column key={id} columnId={id} />)
  return <Wrapper>{columns}</Wrapper>
}

const Wrapper = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  align-items: flex-start;
  margin: 0;
  padding: 0;
`
