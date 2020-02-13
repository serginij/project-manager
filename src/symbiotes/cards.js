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
  setError: (state, error) => ({ ...state, error: error }),
  addCard: (state, card) => ({
    ...state,
    cards: {
      ...state.cards,
      [card.id]: {
        name: card.name,
        id: card.id,
        checklists: [],
        desc: '',
        comments: [],
        users: [],
        column_id: card.column_id,
        labels: []
      }
    }
  }),
  editCard: (state, card) => ({
    ...state,
    cards: {
      ...state.cards,
      [card.id]: {
        ...state.cards[card.id],
        name: card.name,
        desc: card.desc,
        deadline: card.deadline,
        checked: card.checked
      }
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
  updateComment: (state, cardId, commentId, comment) => {
    let comments = state.cards[cardId].comments.map(item => {
      if (item.id === commentId) {
        return { ...item, ...comment }
      }

      return item
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
  deleteLabel: (state, cardId, labelId) => {
    let labels = state.cards[cardId].labels.filter(label => label !== labelId)

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
  },
  addList: (state, cardId, list) => {
    let lists = [...state.cards[cardId].checklists, list]

    return {
      ...state,
      cards: {
        ...state.cards,
        [cardId]: { ...state.cards[cardId], checklists: lists }
      }
    }
  },
  updateList: (state, cardId, listId, list) => {
    let lists = state.cards[cardId].checklists.map(item => {
      if (item.id === listId) {
        return { ...item, ...list }
      }

      return item
    })

    return {
      ...state,
      cards: {
        ...state.cards,
        [cardId]: { ...state.cards[cardId], checklists: lists }
      }
    }
  },
  deleteList: (state, cardId, listId) => {
    const lists = state.cards[cardId].checklists.filter(
      item => item.id !== listId
    )

    return {
      ...state,
      cards: {
        ...state.cards,
        [cardId]: { ...state.cards[cardId], checklists: lists }
      }
    }
  },
  addItem: (state, cardId, listId, item) => {
    let lists = state.cards[cardId].checklists.map(list => {
      if (list.id === listId) {
        return { ...list, items: [...list.items, item] }
      }
      return list
    })
    return {
      ...state,
      cards: {
        ...state.cards,
        [cardId]: { ...state.cards[cardId], checklists: lists }
      }
    }
  },
  updateItem: (state, cardId, listId, itemId, item) => {
    let lists = state.cards[cardId].checklists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(element => {
            if (element.id === itemId) {
              return { ...element, ...item }
            }
            return element
          })
        }
      }
      return list
    })
    return {
      ...state,
      cards: {
        ...state.cards,
        [cardId]: { ...state.cards[cardId], checklists: lists }
      }
    }
  },
  deleteItem: (state, cardId, listId, itemId) => {
    let lists = state.cards[cardId].checklists.map(list => {
      if (list.id === listId) {
        return { ...list, items: list.items.filter(item => item.id !== itemId) }
      }
      return list
    })
    return {
      ...state,
      cards: {
        ...state.cards,
        [cardId]: { ...state.cards[cardId], checklists: lists }
      }
    }
  }
}

export const { actions: cardsActions, reducer: cardsReducer } = createSymbiote(
  initialState,
  symbiotes,
  '@@cards'
)
