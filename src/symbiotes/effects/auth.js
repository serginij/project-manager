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
        dispatch(authActions.setError(err))
      })
  }
}

export const signup = data => {
  return dispatch => {
    return post('/signup', { data: data })
      .then(() => {
        dispatch(authActions.signup())
        history.push('/auth')
      })
      .catch(err => {
        console.log(err)
        dispatch(
          authActions.setError({ reason: err.reason, message: err.message })
        )
      })
  }
}
