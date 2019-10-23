import { createSymbiote } from 'redux-symbiote'

const initialState = {
  teams: {}
}

const symbiotes = {
  getTeams: state => ({
    ...state
  })
}

export const { actions: teamsActions, reducer: teamsReducer } = createSymbiote(
  initialState,
  symbiotes,
  '@@movie'
)
