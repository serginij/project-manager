import { createSymbiote } from 'redux-symbiote'

const initialState = {
  loading: false,
  columns: {},
  error: null
}

const symbiotes = {
  getColumns: {
    start: state => ({ ...state, loading: true }),
    fail: (state, error) => ({ ...state, loading: false, error: error }),
    done: (state, columns) => ({ ...state, loading: false, columns: columns })
  },
  addColumn: (state, column) => ({
    ...state,
    columns: {
      ...state.columns,
      [column.id]: { name: column.name, _id: column.id, cards: [] }
    }
  })
}

export const {
  actions: columnsActions,
  reducer: columnsReducer
} = createSymbiote(initialState, symbiotes, '@@teams')
