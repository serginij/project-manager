import { createSymbiote } from 'redux-symbiote'

const initialState = {
  loading: false,
  token: '',
  basePath: '/auth',
  error: null
}

const symbiotes = {
  login: (state, token) => ({ ...state, token: token, basePath: '/' }),
  logout: state => ({
    ...state,
    token: '',
    basePath: '/auth'
  })
}

export const { actions: authActions, reducer: authReducer } = createSymbiote(
  initialState,
  symbiotes,
  '@@auth'
)
