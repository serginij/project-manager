import { combineReducers } from 'redux'

import { teamsReducer } from '@symbiotes/teams'
import { desksReducer } from '@symbiotes/desks'
import { columnsReducer } from '@symbiotes/columns'
import { cardsReducer } from '@symbiotes/cards'

export const reducer = combineReducers({
  teams: teamsReducer,
  desks: desksReducer,
  columns: columnsReducer,
  cards: cardsReducer
})
