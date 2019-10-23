import { combineReducers } from 'redux'

import { teamsReducer } from '@symbiotes/teams'

export const reducer = combineReducers({
  teams: teamsReducer
})
