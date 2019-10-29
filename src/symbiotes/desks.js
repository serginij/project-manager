import { createSymbiote } from 'redux-symbiote'

const initialState = {
  loading: false,
  desks: {
    '123': {
      name: 'One',
      id: '123',
      columns: []
    },
    '143': {
      name: 'Two',
      id: '143',
      columns: []
    },
    '334': {
      name: 'Three',
      id: '334',
      columns: []
    }
  },
  error: null,
  currentDesk: null
}

const symbiotes = {
  getDesks: {
    start: state => ({ ...state, loading: true }),
    fail: (state, error) => ({ ...state, loading: false, error: error }),
    done: (state, desks) => ({ ...state, loading: false, teams: desks })
  },
  addDesk: (state, desk) => ({
    ...state,
    desks: {
      ...state.desks,
      [desk.id]: { name: desk.name, id: desk.id, columns: [] }
    }
  }),
  setCurrentDesk: (state, deskId) => ({ ...state, currentDesk: deskId }),
  addColumn: (state, deskId, columnId) => ({
    ...state,
    desks: {
      ...state.desks,
      [deskId]: {
        ...state.desks[deskId],
        columns: [...state.desks[deskId].columns, columnId]
      }
    }
  }),
  deleteColumn: (state, columnId) => {
    const filteredColumns = state.desks[state.currentDesk].columns.filter(
      id => id !== columnId
    )
    return {
      ...state,
      desks: {
        ...state.desks,
        [state.currentDesk]: {
          ...state.desks[state.currentDesk],
          columns: filteredColumns
        }
      }
    }
  }
}

export const { actions: desksActions, reducer: desksReducer } = createSymbiote(
  initialState,
  symbiotes,
  '@@desks'
)
