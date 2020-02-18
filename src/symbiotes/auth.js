import { createSymbiote } from 'redux-symbiote'

const initialState = {
  token: '',
  basePath: '/auth',
  error: null,
  hidden: true,
  signup: false
}

const symbiotes = {
  login: (state, token) => ({
    ...state,
    token: token,
    basePath: '/',
    hidden: false,
    signup: false,
    error: null
  }),
  logout: state => ({
    ...state,
    token: '',
    basePath: '/auth',
    hidden: true,
    signup: false,
    error: null
  }),
  setError: (state, err) => ({ ...state, error: err }),
  signup: state => ({
    ...state,
    token: '',
    basePath: '/auth',
    signup: true,
    error: null
  })
}

export const { actions: authActions, reducer: authReducer } = createSymbiote(
  initialState,
  symbiotes,
  '@@auth'
)
