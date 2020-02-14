import { teamsActions } from '@symbiotes/teams'
import { desksActions } from '@symbiotes/desks'
import { columnsActions } from '@symbiotes/columns'
import { cardsActions } from '@symbiotes/cards'
import { get, post, del, update } from '@lib/request'

import { history } from '@lib/routing'

import { addDesk as createDesk, deleteDesk as delDesk } from '../helpers'

export const addDesk = (name, teamId) => {
  return dispatch => {
    return post('/desks', {
      teamId: teamId,
      name: name
    }).then(res => {
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

export const findTeamUser = (teamId, username) => {
  return dispatch => {
    if (username.length) {
      return get(`/teams/${teamId}/user/find/${username}`)
        .then(res => {
          dispatch(desksActions.setFoundList(res.users))
          console.log(res)
        })
        .catch(err => console.log(err))
    } else {
      dispatch(desksActions.setFoundList([]))
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

export const findDeskUser = (deskId, username, token) => {
  return dispatch => {
    if (username.length) {
      return get(`/desks/${deskId}/user/find/${username}`, {}, token)
        .then(res => {
          dispatch(desksActions.findUsers(res.users))
          console.log(res)
        })
        .catch(err => console.log(err))
    } else {
      dispatch(desksActions.setFoundList())
    }
  }
}
