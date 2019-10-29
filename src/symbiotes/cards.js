import { createSymbiote } from 'redux-symbiote'

const initialState = {
  loading: false,
  cards: {},
  error: null
}

const symbiotes = {
  getCards: {
    start: state => ({ ...state, loading: true }),
    fail: (state, error) => ({ ...state, loading: false, error: error }),
    done: (state, cards) => ({ ...state, loading: false, columns: cards })
  },
  addCard: (state, card) => ({
    ...state,
    cards: {
      ...state.cards,
      [card.id]: { name: card.name, _id: card.id, checkList: [] }
    }
  })
}

export const { actions: cardsActions, reducer: cardsReducer } = createSymbiote(
  initialState,
  symbiotes,
  '@@cards'
)
