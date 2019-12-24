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
    done: (state, cards) => ({ ...state, loading: false, cards: cards })
  },
  addCard: (state, card) => ({
    ...state,
    cards: {
      ...state.cards,
      [card.id]: { name: card.name, _id: card.id, checkList: [] }
    }
  }),
  editCard: (state, card) => ({
    ...state,
    cards: {
      ...state.cards,
      [card.id]: { ...state.cards[card.id], name: card.name }
    }
  }),
  addComment: (state, comment, cardId) => ({
    ...state,
    cards: {
      ...state.cards,
      [cardId]: {
        ...state.cards[cardId],
        comments: [...state.cards[cardId].comments, comment]
      }
    }
  })
}

export const { actions: cardsActions, reducer: cardsReducer } = createSymbiote(
  initialState,
  symbiotes,
  '@@cards'
)
