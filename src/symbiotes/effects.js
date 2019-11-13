import { teamsActions } from '@symbiotes/teams'
import { desksActions } from '@symbiotes/desks'
import { authActions } from '@symbiotes/auth'

import { request, post, del, update } from '@lib/request'

import { history } from '@lib/routing'

import {
  addDesk as createDesk,
  addColumn as createColumn,
  addCard as createCard,
  storeToken
} from './helpers'
import { columnsActions } from './columns'
import { cardsActions } from './cards'

export const fetchTeams = token => {
  return dispatch => {
    dispatch(teamsActions.getTeams.start())

    console.log('fetchTeams', token)

    return request('http://localhost:3000/teams', {}, token)
      .then(res => {
        if (res.status === 200) {
          dispatch(teamsActions.getTeams.done(res.teams))
          dispatch(desksActions.getDesks.done(res.desks))
        }
        console.log(res.status)
      })
      .catch(err => {
        console.log('effects.js: fetchTeams error', err)
        dispatch(teamsActions.getTeams.fail(err))
        history.push('/auth')
      })
  }
}

export const addDesk = name => {
  return dispatch => {
    return post('http://localhost:3000/desks', { teamId: 3, name: name }).then(
      res => {
        console.log(res)
        dispatch(createDesk(name, 3, res.id))
      }
    )
  }
}

export const getDesk = id => {
  return dispatch => {
    return request(`http://localhost:3000/desks/${id}`)
      .then(res => {
        console.log(res)
        dispatch(desksActions.updateDesk(res.desk))
        dispatch(columnsActions.getColumns.done(res.columns))
        dispatch(cardsActions.getCards.done(res.cards))
        dispatch(desksActions.setCurrentDesk(id))
      })
      .catch(err => console.log(err))
  }
}

export const addColumn = (name, deskId) => {
  return dispatch => {
    return post('http://localhost:3000/desks/columns', {
      name: name,
      deskId: deskId
    })
      .then(res => {
        console.log(res)
        dispatch(createColumn(name, deskId, res.id))
      })
      .catch(err => console.log(err))
  }
}

export const deleteColumn = columnId => {
  return dispatch => {
    return del(`http://localhost:3000/desks/columns/${columnId}`).then(res => {
      console.log('effects.js: deleteColumn res', res)
      dispatch(desksActions.deleteColumn(columnId))
    })
  }
}

export const addCard = (name, columnId) => {
  return dispatch => {
    return post('http://localhost:3000/desks/cards', {
      name: name,
      columnId: columnId
    })
      .then(res => {
        console.log(res)
        dispatch(createCard(name, columnId, res.id))
      })
      .catch(err => console.log(err))
  }
}

export const deleteCard = (columnId, cardId) => {
  return dispatch => {
    return del(`http://localhost:3000/desks/cards/${cardId}`).then(res => {
      console.log('effects.js: deleteCard res', res)
      dispatch(columnsActions.deleteCard(columnId, cardId))
    })
  }
}

export const updateCard = (cardId, columnId, name) => {
  return dispatch => {
    return update(`http://localhost:3000/desks/cards/${cardId}`, {
      name,
      columnId
    })
      .then(() => {
        dispatch(cardsActions.editCard({ name: name, id: cardId }))
      })
      .catch(err => console.log(err))
  }
}

export const login = (username, password) => {
  return dispatch => {
    return post('http://localhost:3000/login', {
      username,
      password
    })
      .then(res => {
        dispatch(authActions.login(res.token))
        storeToken(res.token)
        history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const signup = (username, password) => {
  return dispatch => {
    return post('http://localhost:3000/signup', { username, password })
      .then(res => {
        dispatch(authActions.login(res.token))
        history.push('/')
      })
      .catch(err => console.log(err))
  }
}
