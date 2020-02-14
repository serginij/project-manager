import { desksActions, desksReducer } from '../desks'

describe('desks reducer', () => {
  it('should store token', () => {
    const initial = {
      currentDesk: null,
      desks: {}
    }

    const state = desksReducer(
      initial,
      desksActions.getDesks.done({ 1: { id: 1, name: 'hell', team_id: 1 } })
    )

    const expected = {
      currentDesk: null,
      desks: { 1: { id: 1, name: 'hell', team_id: 1 } },
      loading: false
    }

    expect(state).toEqual(expected)
  })

  it('should add desk', () => {
    const initial = {
      currentDesk: null,
      desks: { 1: { id: 1, name: 'one', team_id: 1 } }
    }

    const state = desksReducer(
      initial,
      desksActions.addDesk({ id: 2, name: 'two' })
    )

    const expected = {
      currentDesk: null,
      desks: {
        1: { id: 1, name: 'one', team_id: 1 },
        2: { id: 2, name: 'two', columns: [] }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should delete desk', () => {
    const initial = {
      currentDesk: null,
      desks: {
        1: { id: 1, name: 'one', team_id: 1 },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    const state = desksReducer(initial, desksActions.deleteDesk(2))

    const expected = {
      currentDesk: null,
      desks: {
        1: { id: 1, name: 'one', team_id: 1 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should update desk', () => {
    const initial = {
      currentDesk: null,
      desks: {
        1: { id: 1, name: 'one', team_id: 1 },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    const state = desksReducer(
      initial,
      desksActions.updateDesk({ id: 2, name: 'new one' })
    )

    const expected = {
      currentDesk: null,
      desks: {
        1: { id: 1, name: 'one', team_id: 1 },
        2: { id: 2, name: 'new one', team_id: 1 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should set current desk', () => {
    const initial = {
      currentDesk: null,
      desks: {
        1: { id: 1, name: 'one', team_id: 1 },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    const state = desksReducer(initial, desksActions.setCurrentDesk(2))

    const expected = {
      currentDesk: 2,
      desks: {
        1: { id: 1, name: 'one', team_id: 1 },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should set found list', () => {
    const initial = {
      currentDesk: null,
      foundList: [],
      desks: {
        1: { id: 1, name: 'one', team_id: 1 },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    const state = desksReducer(
      initial,
      desksActions.setFoundList([{ id: 1, username: 'qwerty' }])
    )

    const expected = {
      currentDesk: null,
      desks: {
        1: { id: 1, name: 'one', team_id: 1 },
        2: { id: 2, name: 'two', team_id: 1 }
      },
      foundList: [{ id: 1, username: 'qwerty' }]
    }

    expect(state).toEqual(expected)
  })

  it('should add column', () => {
    const initial = {
      currentDesk: null,

      desks: {
        1: { id: 1, name: 'one', team_id: 1, columns: [1] },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    const state = desksReducer(initial, desksActions.addColumn(1, 2))

    const expected = {
      currentDesk: null,
      desks: {
        1: { id: 1, name: 'one', team_id: 1, columns: [1, 2] },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should delete column', () => {
    const initial = {
      currentDesk: 1,

      desks: {
        1: { id: 1, name: 'one', team_id: 1, columns: [1, 2] },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    const state = desksReducer(initial, desksActions.deleteColumn(2))

    const expected = {
      currentDesk: 1,
      desks: {
        1: { id: 1, name: 'one', team_id: 1, columns: [1] },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should add user', () => {
    const initial = {
      currentDesk: 1,
      desks: {
        1: {
          id: 1,
          name: 'one',
          team_id: 1,
          users: [{ id: 1, username: 'test' }]
        },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    const state = desksReducer(
      initial,
      desksActions.addUser(1, { id: 2, username: 'qwerty' })
    )

    const expected = {
      currentDesk: 1,
      desks: {
        1: {
          id: 1,
          name: 'one',
          team_id: 1,
          users: [
            { id: 1, username: 'test' },
            { id: 2, username: 'qwerty' }
          ]
        },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should delete user', () => {
    const initial = {
      currentDesk: 1,
      desks: {
        1: {
          id: 1,
          name: 'one',
          team_id: 1,
          users: [
            { id: 1, username: 'test' },
            { id: 2, username: 'abc' }
          ]
        },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    const state = desksReducer(initial, desksActions.deleteUser(1, 2))

    const expected = {
      currentDesk: 1,
      desks: {
        1: {
          id: 1,
          name: 'one',
          team_id: 1,
          users: [{ id: 1, username: 'test' }]
        },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should add label', () => {
    const initial = {
      currentDesk: 1,
      desks: {
        1: {
          id: 1,
          name: 'one',
          team_id: 1,
          labels: { 1: { id: 1, color: 'white', name: '' } }
        },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    const state = desksReducer(
      initial,
      desksActions.addLabel(1, { id: 2, color: 'black', name: '' })
    )

    const expected = {
      currentDesk: 1,
      desks: {
        1: {
          id: 1,
          name: 'one',
          team_id: 1,
          labels: {
            1: { id: 1, color: 'white', name: '' },
            2: { id: 2, color: 'black', name: '' }
          }
        },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should delete label', () => {
    const initial = {
      currentDesk: 1,
      desks: {
        1: {
          id: 1,
          name: 'one',
          team_id: 1,
          labels: {
            1: { id: 1, color: 'white', name: '' },
            2: { id: 2, color: 'black', name: '' }
          }
        },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    const state = desksReducer(initial, desksActions.deleteLabel(1, 2))

    const expected = {
      currentDesk: 1,
      desks: {
        1: {
          id: 1,
          name: 'one',
          team_id: 1,
          labels: {
            1: { id: 1, color: 'white', name: '' }
          }
        },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should udpate label', () => {
    const initial = {
      currentDesk: 1,
      desks: {
        1: {
          id: 1,
          name: 'one',
          team_id: 1,
          labels: {
            1: { id: 1, color: 'white', name: '' },
            2: { id: 2, color: 'black', name: '' }
          }
        },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    const state = desksReducer(
      initial,
      desksActions.updateLabel(1, 2, { name: 'dev' })
    )

    const expected = {
      currentDesk: 1,
      desks: {
        1: {
          id: 1,
          name: 'one',
          team_id: 1,
          labels: {
            1: { id: 1, color: 'white', name: '' },
            2: { id: 2, color: 'black', name: 'dev' }
          }
        },
        2: { id: 2, name: 'two', team_id: 1 }
      }
    }

    expect(state).toEqual(expected)
  })
})
