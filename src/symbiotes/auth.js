import { createSymbiote } from 'redux-symbiote'

const initialState = {
  token: '',
  basePath: '/auth',
  error: null,
  hidden: false
}

const symbiotes = {
  login: (state, token) => ({
    ...state,
    token: token,
    basePath: '/',
    hidden: false
  }),
  logout: state => ({
    ...state,
    token: '',
    basePath: '/auth',
    hidden: true
  })
}

export const { actions: authActions, reducer: authReducer } = createSymbiote(
  initialState,
  symbiotes,
  '@@auth'
)
