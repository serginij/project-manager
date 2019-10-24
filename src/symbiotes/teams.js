import { createSymbiote } from 'redux-symbiote'

const initialState = {
  loading: false,
  teams: {},
  error: null
}

const symbiotes = {
  getTeams: {
    start: state => ({ ...state, loading: true }),
    fail: (state, error) => ({ ...state, loading: false, error: error }),
    done: (state, teams) => ({ ...state, loading: false, teams: teams })
  }
}

export const { actions: teamsActions, reducer: teamsReducer } = createSymbiote(
  initialState,
  symbiotes,
  '@@teams'
)
