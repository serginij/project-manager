import { authActions, authReducer } from '../auth'

describe('auth reducer', () => {
  it('should store token', () => {
    const initial = {
      token: '',
      basePath: '/auth',
      hidden: true
    }

    const state = authReducer(initial, authActions.login('some-token'))

    const expected = { token: 'some-token', basePath: '/', hidden: false }

    expect(state).toEqual(expected)
  })

  it('should remove token', () => {
    const initial = {
      token: 'some-token',
      basePath: '/',
      hidden: false
    }

    const state = authReducer(initial, authActions.logout())

    const expected = { token: '', basePath: '/auth', hidden: true }

    expect(state).toEqual(expected)
  })
})
