import { teamsActions } from '@symbiotes/teams'
import { desksActions } from '@symbiotes/desks'
import { authActions } from '@symbiotes/auth'

import { get, post, del, update } from '@lib/request'

import { history } from '@lib/routing'

import {
  addDesk as createDesk,
  addColumn as createColumn,
  addCard as createCard,
  storeToken,
  deleteDesk as delDesk
} from './helpers'
import { columnsActions } from './columns'
import { cardsActions } from './cards'

export const fetchTeams = token => {
  return dispatch => {
    dispatch(teamsActions.getTeams.start())

    return get('/teams', {}, token)
      .then(res => {
        dispatch(teamsActions.getTeams.done(res.teams))
        dispatch(desksActions.getDesks.done(res.desks))
      })
      .catch(err => {
        console.log('effects.js: fetchTeams error', err)
        history.push('/auth')
      })
  }
}

export const addDesk = (name, teamId) => {
  return dispatch => {
    return post('/desks', {
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
    return get(`/desks/${id}`)
      .then(res => {
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
    return post('/desks/columns', {
      name: name,
      deskId: deskId
    })
      .then(res => {
        dispatch(createColumn(name, deskId, res.id))
      })
      .catch(err => console.log(err))
  }
}

export const deleteColumn = columnId => {
  return dispatch => {
    return del(`/desks/columns/${columnId}`).then(() => {
      dispatch(desksActions.deleteColumn(columnId))
    })
  }
}

export const addCard = (name, columnId) => {
  return dispatch => {
    return post('/desks/cards', {
      name: name,
      columnId: columnId
    })
      .then(res => {
        dispatch(createCard(name, columnId, res.id))
      })
      .catch(err => console.log(err))
  }
}

export const deleteCard = (columnId, cardId) => {
  return dispatch => {
    return del(`/desks/cards/${cardId}`).then(() => {
      dispatch(columnsActions.deleteCard(columnId, cardId))
    })
  }
}

export const updateCard = (cardId, columnId, name) => {
  return dispatch => {
    return update(`/desks/cards/${cardId}`, {
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
    return post('/login', {
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
    return post('/signup', { username, password })
      .then(res => {
        dispatch(authActions.login(res.token))
        history.push('/')
      })
      .catch(err => console.log(err))
  }
}

export const addTeam = (name, desc, token) => {
  return dispatch => {
    return post('/teams', { name, desc }, token)
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
    return update(`/teams/${teamId}`, { name, desc }, token)
      .then(res => {
        console.log('updateTeam status: ', res.ok)
        dispatch(
          teamsActions.updateTeam({ name: name, desc: desc, id: teamId })
        )
        history.push('/')
      })
      .catch(err => console.log(err))
  }
}

export const findUser = username => {
  return dispatch => {
    if (username.length) {
      return get(`/user/find/${username}`)
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
    return post(`/teams/${teamId}/users`, { userId: user.id }, token)
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
  }
}

export const deleteTeamUser = (userId, teamId, token) => dispatch => {
  return del(`/teams/${teamId}/users/${userId}`, {}, token)
    .then(() => dispatch(teamsActions.deleteUser(teamId, userId)))
    .catch(err => console.log(err))
}

export const updateTeamUser = (userId, teamId, isAdmin, token) => dispatch => {
  return update(`/teams/${teamId}/users/${userId}`, { isAdmin }, token)
    .then(() => dispatch(teamsActions.updateUser(teamId, userId, isAdmin)))
    .catch(err => console.log(err))
}

export const findTeamUser = (teamId, username) => {
  return dispatch => {
    if (username.length) {
      return get(`/teams/${teamId}/user/find/${username}`)
        .then(res => {
          dispatch(desksActions.findUsers(res.users))
          console.log(res)
        })
        .catch(err => console.log(err))
    } else {
      dispatch(teamsActions.findUsers([]))
    }
  }
}

export const addDeskUser = (user, deskId, token) => {
  return dispatch => {
    return post(`/desks/${deskId}/users`, { userId: user.id }, token)
      .then(() => {
        dispatch(
          desksActions.addUser(deskId, {
            id: user.id,
            username: user.username
          })
        )
      })
      .catch(err => console.log(err))
  }
}

export const deleteDeskUser = (userId, deskId, token) => dispatch => {
  return del(`/desks/${deskId}/users/${userId}`, {}, token)
    .then(() => dispatch(teamsActions.deleteUser(deskId, userId)))
    .catch(err => console.log(err))
}

export const updateDesk = (name, deskId, token) => {
  console.log('effects.js: updateDesk', name, deskId, token)
  return dispatch => {
    return update(`/desks/${deskId}`, { name }, token)
      .then(() => {
        dispatch(desksActions.updateDesk({ name: name, id: deskId }))
        history.goBack()
      })
      .catch(err => console.log(err))
  }
}

export const deleteDesk = (teamId, deskId, token) => {
  return dispatch => {
    return del(`/desks/${deskId}`, {}, token)
      .then(() => {
        console.log('effects.js: deleteDesk successful')
        history.push('/')
        dispatch(delDesk(teamId, deskId))
      })
      .catch(err => console.log(err))
  }
}

export const deleteTeam = (teamId, token) => {
  return dispatch => {
    return del(`/teams/${teamId}`, {}, token)
      .then(() => {
        dispatch(teamsActions.deleteTeam(teamId))
        history.goBack()
      })
      .catch(err => console.log(err))
  }
}

export const updateColumn = (id, name, token) => {
  return dispatch => {
    return update(`/desks/columns/${id}`, { name }, token)
      .then(() => {
        dispatch(columnsActions.updateColumn(id, name))
      })
      .catch(err => console.log('updateColumn', err))
  }
}
