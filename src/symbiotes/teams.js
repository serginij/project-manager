import { createSymbiote } from 'redux-symbiote'

const initialState = {
  loading: false,
  teams: {},
  error: null,
  currentTeam: null,
  findList: []
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
      [team.id]: { name: team.name, id: team.id, desks: [], desc: team.desc }
    }
  }),
  addDesk: (state, teamId, deskId) => ({
    ...state,
    teams: {
      ...state.teams,
      [teamId]: {
        ...state.teams[teamId],
        desks: [...state.teams[teamId].desks, deskId]
      }
    }
  }),
  selectTeam: (state, teamId) => ({ ...state, currentTeam: teamId }),
  updateTeam: (state, team) => ({
    ...state,
    teams: {
      ...state.teams,
      [team.id]: {
        ...state.teams[team.id],
        name: team.name,
        desc: team.desc
      }
    }
  }),
  findUsers: (state, users) => ({ ...state, findList: users })
}

export const { actions: teamsActions, reducer: teamsReducer } = createSymbiote(
  initialState,
  symbiotes,
  '@@teams'
)
