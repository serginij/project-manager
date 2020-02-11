import { authActions } from '@symbiotes/auth'

import { post } from '@lib/request'

import { history } from '@lib/routing'
import { storeToken } from '../helpers'

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
