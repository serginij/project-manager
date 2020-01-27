import { createSymbiote } from 'redux-symbiote'

const initialState = {
  loading: false,
  cards: {},
  error: null,
  currentCard: null
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
      [card.id]: { ...state.cards[card.id], name: card.name, desc: card.desc }
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
  }),
  deleteComment: (state, cardId, commentId) => ({
    ...state,
    cards: {
      ...state.cards,
      [cardId]: {
        ...state.cards[cardId],
        comments: state.cards[cardId].comments.filter(
          comment => comment.id !== commentId
        )
      }
    }
  }),
  updateComment: (state, cardId, commentId, text) => {
    let comments = state.cards[cardId].comments.map(comment => {
      if (comment.id === commentId) {
        comment.text = text
      }
      return comment
    })
    return {
      ...state,
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          comments: comments
        }
      }
    }
  },
  setCurrent: (state, id) => ({ ...state, currentCard: id }),
  addUser: (state, id, user) => ({
    ...state,
    cards: {
      ...state.cards,
      [id]: {
        ...state.cards[id],
        users: [...state.cards[id].users, user]
      }
    }
  }),
  deleteUser: (state, id, userId) => ({
    ...state,
    cards: {
      ...state.cards,
      [id]: {
        ...state.cards[id],
        users: state.cards[id].users.filter(user => user.id !== userId)
      }
    }
  }),
  addLabel: (state, cardId, label) => ({
    ...state,
    cards: {
      ...state.cards,
      [cardId]: {
        ...state.cards[cardId],
        labels: [...state.cards[cardId].labels, label]
      }
    }
  }),
  editLabel: (state, cardId, label) => {
    let labels = state.labels.forEach(lab => {
      if (lab.id == label.id) {
        label = {
          ...lab,
          ...label
        }
      }
    })
    return {
      ...state,
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          labels: labels
        }
      }
    }
  }
}

export const { actions: cardsActions, reducer: cardsReducer } = createSymbiote(
  initialState,
  symbiotes,
  '@@cards'
)
