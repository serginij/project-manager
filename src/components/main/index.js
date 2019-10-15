import React from 'react'

import { DeskList } from './desk-list'

const desks = [
  {
    name: 'One'
  },
  {
    name: 'Two'
  },
  {
    name: 'Three'
  }
]

export const Main = () => (
  <div>
    <h1>Main Page</h1>
    <DeskList title="Test" desks={desks} />
  </div>
)
