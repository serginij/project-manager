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
  }),
  addCard: (state, columnId, cardId) => ({
    ...state,
    columns: {
      ...state.columns,
      [columnId]: {
        ...state.columns[columnId],
        cards: [...state.columns[columnId].cards, cardId]
      }
    }
  }),
  deleteCard: (state, columnId, cardId) => {
    const filteredCards = state.columns[columnId].cards.filter(
      id => id !== cardId
    )
    return {
      ...state,
      columns: {
        ...state.columns,
        [columnId]: {
          ...state.columns[columnId],
          cards: filteredCards
        }
      }
    }
  }
}

export const {
  actions: columnsActions,
  reducer: columnsReducer
} = createSymbiote(initialState, symbiotes, '@@columns')
