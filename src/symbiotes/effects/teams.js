import { teamsActions } from '@symbiotes/teams'
import { desksActions } from '@symbiotes/desks'

import { get, post, del, update } from '@lib/request'
import { history } from '@lib/routing'

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
  // console.log('effects.js: updateTeam', name, desc, teamId, token)
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
