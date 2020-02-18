import { authActions, authReducer } from '../auth'

describe('auth reducer', () => {
  it('should login', () => {
    const initial = {
      token: '',
      basePath: '/auth',
      hidden: true,
      signup: false,
      error: 'some err'
    }

    const state = authReducer(initial, authActions.login('some-token'))

    const expected = {
      token: 'some-token',
      basePath: '/',
      hidden: false,
      signup: false,
      error: null
    }

    expect(state).toEqual(expected)
  })

  it('should logout', () => {
    const initial = {
      token: 'some-token',
      basePath: '/',
      hidden: false,
      error: 'some-err'
    }

    const state = authReducer(initial, authActions.logout())

    const expected = {
      token: '',
      basePath: '/auth',
      hidden: true,
      error: null,
      signup: false
    }

    expect(state).toEqual(expected)
  })

  it('should signup', () => {
    const initial = {
      token: 'some-token',
      basePath: '/',
      hidden: false,
      error: 'some-err'
    }

    const state = authReducer(initial, authActions.signup())

    const expected = {
      token: '',
      basePath: '/auth',
      hidden: false,
      error: null,
      signup: true
    }

    expect(state).toEqual(expected)
  })

  it('should store error', () => {
    const initial = {
      token: '',
      basePath: '/',
      hidden: false,
      error: null
    }

    const state = authReducer(
      initial,
      authActions.setError('something went wrong')
    )

    const expected = {
      token: '',
      basePath: '/',
      hidden: false,
      error: 'something went wrong'
    }

    expect(state).toEqual(expected)
  })
})
