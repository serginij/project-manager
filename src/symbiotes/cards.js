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
        column_id: card.column_id
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
        item = { ...item, ...comment }
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
  },
  addList: (state, cardId, list) => {
    let lists = [...state.cards[cardId].checklists]
    lists.push(list)
    return {
      ...state,
      cards: {
        ...state.cards,
        [cardId]: { ...state.cards[cardId], checklists: lists }
      }
    }
  },
  updateList: (state, cardId, listId, list) => {
    let lists = [...state.cards[cardId].checklists]
    lists.map(item => {
      if (item.id === listId) {
        item = { ...item, ...list }
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
    let lists = [...state.cards[cardId].checklists]
    lists = lists.filter(item => item.id !== listId)
    return {
      ...state,
      cards: {
        ...state.cards,
        [cardId]: { ...state.cards[cardId], checklists: lists }
      }
    }
  },
  addItem: (state, cardId, listId, item) => {
    let lists = [...state.cards[cardId].checklists].map(list => {
      if (list.id === listId) {
        list.items.push(item)
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
    let lists = [...state.cards[cardId].checklists]
    lists.map(list => {
      if (list.id === listId) {
        list.items.map(element => {
          if (element.id === item.id) {
            element.text = item.text
            element.checked = item.checked
          }
          return element
        })
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
    let lists = [...state.cards[cardId].checklists]
    lists.map(list => {
      if (list.id === listId) {
        list.items = list.items.filter(item => item.id !== itemId)
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
