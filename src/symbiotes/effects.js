import { teamsActions } from '@symbiotes/teams'
import { desksActions } from '@symbiotes/desks'
import { authActions } from '@symbiotes/auth'

import { get, post, del, update } from '@lib/request'

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

    return get('http://localhost:3000/teams', {}, token)
      .then(res => {
        dispatch(teamsActions.getTeams.done(res.teams))
        dispatch(desksActions.getDesks.done(res.desks))
        console.log(res)
      })
      .catch(err => {
        console.log('effects.js: fetchTeams error', err)
        history.push('/auth')
      })
  }
}

export const addDesk = (name, teamId) => {
  return dispatch => {
    return post('http://localhost:3000/desks', {
      teamId: teamId,
      name: name
    }).then(res => {
      console.log(res)
      dispatch(createDesk(name, teamId, res.id))
    })
  }
}

export const getDesk = id => {
  return dispatch => {
    return get(`http://localhost:3000/desks/${id}`)
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

export const addTeam = (name, desc, token) => {
  return dispatch => {
    return post('http://localhost:3000/teams', { name, desc }, token)
      .then(res => {
        dispatch(teamsActions.addTeam({ name: name, desc: desc, id: res.id }))
        history.push('/')
      })
      .catch(err => console.log(err))
  }
}

export const updateTeam = (name, desc, teamId, token) => {
  console.log('effects.js: updateTeam', name, desc, teamId, token)
  return dispatch => {
    return (
      update(`http://localhost:3000/teams/${teamId}`, { name, desc }, token)
        // .then(handleErrors)
        .then(() => {
          dispatch(
            teamsActions.updateTeam({ name: name, desc: desc, id: teamId })
          )
          history.push('/')
        })
        .catch(err => console.log(err))
    )
  }
}

export const findUser = username => {
  return dispatch => {
    if (username.length) {
      return get(`http://localhost:3000/user/find/${username}`)
        .then(res => {
          dispatch(teamsActions.findUsers(res.users))
          console.log(res)
        })
        .catch(err => console.log(err))
    } else {
      dispatch(teamsActions.findUsers([]))
    }
  }
}

export const addTeamUser = (user, teamId, token) => {
  return dispatch => {
    return (
      post(
        `http://localhost:3000/teams/${teamId}/users`,
        { userId: user.id },
        token
      )
        // .then(handleErrors)
        .then(res => {
          dispatch(
            teamsActions.addUser(teamId, {
              id: user.id,
              username: user.username,
              is_admin: res.is_admin
            })
          )
        })
        .catch(err => console.log(err))
    )
  }
}

export const deleteTeamUser = (userId, teamId, token) => dispatch => {
  return (
    del(`http://localhost:3000/teams/${teamId}/users/${userId}`, {}, token)
      // .then(handleErrors)
      .then(() => dispatch(teamsActions.deleteUser(teamId, userId)))
      .catch(err => console.log(err))
  )
}

export const updateTeamUser = (userId, teamId, isAdmin, token) => dispatch => {
  return (
    update(
      `http://localhost:3000/teams/${teamId}/users/${userId}`,
      { isAdmin },
      token
    )
      // .then(handleErrors)
      .then(() => dispatch(teamsActions.updateUser(teamId, userId, isAdmin)))
      .catch(err => console.log(err))
  )
}
