import { teamsReducer, teamsActions } from '../teams'

describe('auth reducer', () => {
  it('should store teams', () => {
    const initial = {
      teams: {},
      currentTeam: null,
      loading: false
    }

    const state = teamsReducer(
      initial,
      teamsActions.getTeams.done({
        1: { id: 1, name: 'some' },
        2: { id: 2, name: 'name' }
      })
    )

    const expected = {
      loading: false,
      currentTeam: null,
      teams: { 1: { id: 1, name: 'some' }, 2: { id: 2, name: 'name' } }
    }

    expect(state).toEqual(expected)
  })

  it('should add team', () => {
    const initial = {
      teams: { 1: { id: 1, name: 'some' } },
      currentTeam: null
    }

    const state = teamsReducer(
      initial,
      teamsActions.addTeam({ id: 2, name: 'name', desc: '' })
    )

    const expected = {
      currentTeam: null,
      teams: {
        1: { id: 1, name: 'some' },
        2: { id: 2, name: 'name', desks: [], desc: '' }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should delete team', () => {
    const initial = {
      teams: {
        1: { id: 1, name: 'some' },
        2: { id: 2, desc: '123', name: 'name' }
      },
      currentTeam: null
    }

    const state = teamsReducer(initial, teamsActions.deleteTeam(2))

    const expected = {
      currentTeam: null,
      teams: {
        1: { id: 1, name: 'some' }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should update team', () => {
    const initial = {
      teams: {
        1: { id: 1, name: 'some' },
        2: { id: 2, desc: '123', name: 'name' }
      },
      currentTeam: null
    }

    const state = teamsReducer(
      initial,
      teamsActions.updateTeam({ id: 1, desc: '' })
    )

    const expected = {
      currentTeam: null,
      teams: {
        1: { id: 1, name: 'some', desc: '' },
        2: { id: 2, desc: '123', name: 'name' }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should add desk', () => {
    const initial = {
      teams: {
        1: { id: 1, name: 'some', desks: [1] },
        2: { id: 2 }
      },
      currentTeam: null
    }

    const state = teamsReducer(initial, teamsActions.addDesk(1, 3))

    const expected = {
      currentTeam: null,
      teams: {
        1: { id: 1, name: 'some', desks: [1, 3] },
        2: { id: 2 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should delete desk', () => {
    const initial = {
      teams: {
        1: { id: 1, name: 'some', desks: [1, 3] },
        2: { id: 2 }
      },
      currentTeam: null
    }

    const state = teamsReducer(initial, teamsActions.deleteDesk(1, 3))

    const expected = {
      currentTeam: null,
      teams: {
        1: { id: 1, name: 'some', desks: [1] },
        2: { id: 2 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should select team', () => {
    const initial = {
      teams: {
        1: { id: 1, name: 'some', desks: [1] },
        2: { id: 2 }
      },
      currentTeam: null
    }

    const state = teamsReducer(initial, teamsActions.selectTeam(2))

    const expected = {
      currentTeam: 2,
      teams: {
        1: { id: 1, name: 'some', desks: [1] },
        2: { id: 2 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should set found users', () => {
    const initial = {
      teams: {
        1: { id: 1, name: 'some', desks: [1, 3] },
        2: { id: 2 }
      },
      currentTeam: null,
      foundList: [{ id: 2 }]
    }

    const state = teamsReducer(
      initial,
      teamsActions.findUsers([{ id: 1, username: 'user1' }])
    )

    const expected = {
      currentTeam: null,
      teams: {
        1: { id: 1, name: 'some', desks: [1, 3] },
        2: { id: 2 }
      },
      foundList: [{ id: 1, username: 'user1' }]
    }

    expect(state).toEqual(expected)
  })

  it('should add user', () => {
    const initial = {
      teams: {
        1: {
          id: 1,
          name: 'some',
          users: [{ id: 1, username: 'alex', is_admin: true }]
        },
        2: { id: 2 }
      },
      currentTeam: null
    }

    const state = teamsReducer(
      initial,
      teamsActions.addUser(1, { id: 3, username: 'tim', is_admin: false })
    )

    const expected = {
      currentTeam: null,
      teams: {
        1: {
          id: 1,
          name: 'some',
          users: [
            { id: 1, username: 'alex', is_admin: true },
            { id: 3, username: 'tim', is_admin: false }
          ]
        },
        2: { id: 2 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should delete user', () => {
    const initial = {
      teams: {
        1: {
          id: 1,
          name: 'some',
          users: [
            { id: 1, username: 'alex', is_admin: true },
            { id: 3, username: 'tim', is_admin: false }
          ]
        },
        2: { id: 2 }
      },
      currentTeam: null
    }

    const state = teamsReducer(initial, teamsActions.deleteUser(1, 3))

    const expected = {
      currentTeam: null,
      teams: {
        1: {
          id: 1,
          name: 'some',
          users: [{ id: 1, username: 'alex', is_admin: true }]
        },
        2: { id: 2 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should update user', () => {
    const initial = {
      teams: {
        1: {
          id: 1,
          name: 'some',
          users: [
            { id: 1, username: 'alex', is_admin: true },
            { id: 3, username: 'tim', is_admin: false }
          ]
        },
        2: { id: 2 }
      },
      currentTeam: null
    }

    const state = teamsReducer(initial, teamsActions.updateUser(1, 3, true))

    const expected = {
      currentTeam: null,
      teams: {
        1: {
          id: 1,
          name: 'some',
          users: [
            { id: 1, username: 'alex', is_admin: true },
            { id: 3, username: 'tim', is_admin: true }
          ]
        },
        2: { id: 2 }
      }
    }

    expect(state).toEqual(expected)
  })
})
