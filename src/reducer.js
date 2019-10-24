import { combineReducers } from 'redux'

import { teamsReducer } from '@symbiotes/teams'
import { desksReducer } from '@symbiotes/desks'

export const reducer = combineReducers({
  teams: teamsReducer,
  desks: desksReducer
})
