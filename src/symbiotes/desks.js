import { createSymbiote } from 'redux-symbiote'

const initialState = {
  loading: false,
  desks: {},
  error: null,
  currentDesk: null
}

const symbiotes = {
  getDesks: {
    start: state => ({ ...state, loading: true }),
    fail: (state, error) => ({ ...state, loading: false, error: error }),
    done: (state, desks) => ({ ...state, loading: false, desks: desks })
  },
  addDesk: (state, desk) => ({
    ...state,
    desks: {
      ...state.desks,
      [desk.id]: { name: desk.name, id: desk.id, columns: [] }
    }
  }),
  updateDesk: (state, desk) => ({
    ...state,
    desks: {
      ...state.desks,
      [desk.id]: desk
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
