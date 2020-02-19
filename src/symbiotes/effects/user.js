import { authActions } from '@symbiotes/auth'

import { update } from '@lib/request'

import { storeToken } from '../helpers'

export const updateUser = (data, token) => {
  return dispatch => {
    dispatch(authActions.setError(null))
    return update(
      '/users/update',
      {
        name: data.name,
        surname: data.surname,
        username: data.username
      },
      token
    )
      .then(res => {
        dispatch(authActions.login(res.token))
        storeToken(res.token)
      })
      .catch(err => {
        console.log(err)
        dispatch(authActions.setError(err))
      })
  }
}

export const updatePassword = (password, newPassword, token) => {
  return dispatch => {
    dispatch(authActions.setError(null))
    return update(
      '/password',
      {
        password,
        newPassword
      },
      token
    )
      .then(res => {
        dispatch(authActions.login(res.token))
        storeToken(res.token)
        return res
      })
      .catch(err => {
        console.log(err)
        dispatch(authActions.setError(err))
      })
  }
}

export const updateEmail = (email, token) => {
  return dispatch => {
    dispatch(authActions.setError(null))
    return update(
      '/users/update-email',
      {
        email
      },
      token
    )
      .then(res => {
        dispatch(authActions.login(res.token))
        storeToken(res.token)
      })
      .catch(err => {
        console.log(err)
        dispatch(authActions.setError(err))
      })
  }
}
