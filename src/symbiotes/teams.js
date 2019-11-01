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
  },
  addTeam: (state, team) => ({
    ...state,
    teams: {
      ...state.teams,
      [team.id]: { name: team.name, _id: team.id, desks: [] }
    }
  }),
  addDesk: (state, teamId, deskId) => ({
    ...state,
    teams: {
      ...state.teams,
      [teamId]: {
        ...state.teams[teamId],
        cards: [...state.teams[teamId].cards, deskId]
      }
    }
  })
}

export const { actions: teamsActions, reducer: teamsReducer } = createSymbiote(
  initialState,
  symbiotes,
  '@@teams'
)
