import { createSymbiote } from 'redux-symbiote'

const initialState = {
  loading: false,
  desks: {},
  error: null,
  currentDesk: null,
  foundList: []
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
      [desk.id]: {
        ...state.desks[desk.id],
        ...desk
      }
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
  },
  findUsers: (state, users) => ({ ...state, foundList: users }),
  addUser: (state, deskId, user) => ({
    ...state,
    desks: {
      ...state.desks,
      [deskId]: {
        ...state.desks[deskId],
        users: [...state.desks[deskId].users, user]
      }
    }
  }),
  deleteUser: (state, deskId, userId) => ({
    ...state,
    desks: {
      ...state.desks,
      [deskId]: {
        ...state.desks[deskId],
        users: state.desks[deskId].users.filter(user => user.id !== userId)
      }
    }
  }),
  deleteDesk: (state, deskId) => {
    let desks = state.desks
    delete desks[deskId]
    return { ...state, teams: desks }
  },
  setFoundList: (state, deskId, list = state.desks[deskId].users) => ({
    ...state,
    foundList: list
  }),
  addLabel: (state, deskId, label) => ({
    ...state,
    desks: {
      ...state.desks,
      [deskId]: {
        ...state.desks[deskId],
        labels: {
          ...state.desks[deskId].labels,
          [label.id]: label
        }
      }
    }
  }),
  updateLabel: (state, deskId, labelId, label) => {
    let labels = {}
    for (let key in state.desks[deskId].labels) {
      console.log(key)
      if (key == labelId) {
        console.log('found one')
        labels[label.id] = {
          ...state.desks[deskId].labels[labelId],
          ...label
        }
      } else {
        labels[key] = { ...state.desks[deskId].labels[key] }
      }
    }
    return {
      ...state,
      desks: {
        ...state.desks,
        [deskId]: {
          ...state.desks[deskId],
          labels: labels
        }
      }
    }
  },
  deleteLabel: (state, deskId, labelId) => {
    let labels = { ...state.desks[deskId].labels }
    let newLabels = {}
    for (let key in state.desks[deskId].labels) {
      if (key != labelId) {
        newLabels[key] = { ...labels[key] }
      }
    }
    return {
      ...state,
      desks: {
        ...state.desks,
        [deskId]: {
          ...state.desks[deskId],
          labels: newLabels
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
