import { cardsActions, cardsReducer } from '../cards'

describe('cards reducer', () => {
  it('should set error', () => {
    const initial = {
      error: null,
      cards: {}
    }

    const state = cardsReducer(
      initial,
      cardsActions.setError('something went wrong')
    )

    const expected = { error: 'something went wrong', cards: {} }

    expect(state).toEqual(expected)
  })

  it('should set cards', () => {
    const initial = {
      cards: {}
    }

    const state = cardsReducer(
      initial,
      cardsActions.getCards.done({ 1: { id: 1, name: 'hello' }, 2: { id: 2 } })
    )

    const expected = {
      cards: {
        1: {
          name: 'hello',
          id: 1
        },
        2: { id: 2 }
      },
      loading: false
    }

    expect(state).toEqual(expected)
  })

  it('should add card', () => {
    const initial = {
      cards: { 2: { id: 2 } }
    }

    const state = cardsReducer(
      initial,
      cardsActions.addCard({ id: 1, name: 'test', column_id: 1 })
    )

    const expected = {
      cards: {
        1: {
          name: 'test',
          column_id: 1,
          id: 1,
          desc: '',
          checklists: [],
          labels: [],
          users: [],
          comments: [],
          checked: false
        },
        2: { id: 2 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should update card', () => {
    const initial = {
      cards: {
        1: { id: 1, desc: '', name: 'one', checked: false },
        2: { id: 2 }
      }
    }

    const state = cardsReducer(
      initial,
      cardsActions.editCard({ id: 1, name: 'test', desc: 'hello' })
    )

    const expected = {
      cards: {
        1: {
          name: 'test',
          id: 1,
          desc: 'hello',
          checked: false
        },
        2: { id: 2 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should set current card', () => {
    const initial = {
      cards: {
        1: { id: 1, desc: '', name: 'one', checked: false },
        2: { id: 2 }
      },
      error: null,
      currentCard: null
    }

    const state = cardsReducer(initial, cardsActions.setCurrent(2))

    const expected = {
      cards: {
        1: {
          name: 'one',
          id: 1,
          desc: '',
          checked: false
        },
        2: { id: 2 }
      },
      error: null,
      currentCard: 2
    }

    expect(state).toEqual(expected)
  })

  it('should add label', () => {
    const initial = {
      cards: {
        1: { id: 1, desc: '', name: 'one', checked: false, labels: [1, 2] },
        2: { id: 2 }
      }
    }

    const state = cardsReducer(initial, cardsActions.addLabel(1, 4))

    const expected = {
      cards: {
        1: {
          name: 'one',
          id: 1,
          desc: '',
          checked: false,
          labels: [1, 2, 4]
        },
        2: { id: 2 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should delete label', () => {
    const initial = {
      cards: {
        1: { id: 1, desc: '', name: 'one', checked: false, labels: [1, 2] },
        2: { id: 2 }
      }
    }

    const state = cardsReducer(initial, cardsActions.deleteLabel(1, 2))

    const expected = {
      cards: {
        1: {
          name: 'one',
          id: 1,
          desc: '',
          checked: false,
          labels: [1]
        },
        2: { id: 2 }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should add user', () => {
    const initial = {
      cards: {
        1: { id: 1, name: 'one', users: [{ id: 1, username: 'test' }] },
        2: { id: 2 }
      }
    }

    const state = cardsReducer(
      initial,
      cardsActions.addUser(1, { id: 2, username: 'qwerty' })
    )

    const expected = {
      cards: {
        2: { id: 2 },
        1: {
          name: 'one',
          id: 1,
          users: [
            { id: 1, username: 'test' },
            { id: 2, username: 'qwerty' }
          ]
        }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should delete user', () => {
    const initial = {
      cards: {
        1: { id: 1, name: 'one', users: [{ id: 1, username: 'test' }] },
        2: { id: 2 }
      }
    }

    const state = cardsReducer(initial, cardsActions.deleteUser(1, 1))

    const expected = {
      cards: {
        2: { id: 2 },
        1: {
          name: 'one',
          id: 1,
          users: []
        }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should add comment', () => {
    const initial = {
      cards: {
        1: { id: 1, name: 'one', comments: [{ id: 2, text: 'abc' }] },
        2: { id: 2 }
      }
    }

    const state = cardsReducer(
      initial,
      cardsActions.addComment(
        { id: 3, text: 'hello', user_id: 1, date: 123, username: 'test' },
        1
      )
    )

    const expected = {
      cards: {
        2: { id: 2 },
        1: {
          id: 1,
          name: 'one',
          comments: [
            { id: 2, text: 'abc' },
            { id: 3, text: 'hello', user_id: 1, date: 123, username: 'test' }
          ]
        }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should delete comment', () => {
    const initial = {
      cards: {
        1: {
          id: 1,
          name: 'one',
          comments: [{ id: 2, text: 'abc' }, { id: 1 }]
        },
        2: { id: 2 }
      }
    }

    const state = cardsReducer(initial, cardsActions.deleteComment(1, 1))

    const expected = {
      cards: {
        2: { id: 2 },
        1: {
          id: 1,
          name: 'one',
          comments: [{ id: 2, text: 'abc' }]
        }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should update comment', () => {
    const initial = {
      cards: {
        1: {
          id: 1,
          name: 'one',
          comments: [{ id: 2, text: 'abc', date: 333 }, { id: 1 }]
        },
        2: { id: 2 }
      }
    }

    const state = cardsReducer(
      initial,
      cardsActions.updateComment(1, 2, { text: 'hello' })
    )

    const expected = {
      cards: {
        2: { id: 2 },
        1: {
          id: 1,
          name: 'one',
          comments: [{ id: 2, text: 'hello', date: 333 }, { id: 1 }]
        }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should add list', () => {
    const initial = {
      cards: {
        1: {
          id: 1,
          name: 'one',
          checklists: [{ id: 1 }]
        },
        2: { id: 2 }
      }
    }

    const state = cardsReducer(
      initial,
      cardsActions.addList(1, { id: 33, items: [], name: 'test' })
    )

    const expected = {
      cards: {
        2: { id: 2 },
        1: {
          id: 1,
          name: 'one',
          checklists: [{ id: 1 }, { id: 33, items: [], name: 'test' }]
        }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should delete list', () => {
    const initial = {
      cards: {
        1: {
          id: 1,
          name: 'one',
          checklists: [{ id: 1 }, { id: 2, items: [], name: 'test' }]
        },
        2: { id: 2 }
      }
    }

    const state = cardsReducer(initial, cardsActions.deleteList(1, 2))

    const expected = {
      cards: {
        2: { id: 2 },
        1: {
          id: 1,
          name: 'one',
          checklists: [{ id: 1 }]
        }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should update list', () => {
    const initial = {
      cards: {
        1: {
          id: 1,
          name: 'one',
          checklists: [{ id: 1 }, { id: 2, items: [], name: 'test' }]
        },
        2: { id: 2 }
      }
    }

    const state = cardsReducer(
      initial,
      cardsActions.updateList(1, 1, { name: 'name', items: [] })
    )

    const expected = {
      cards: {
        2: { id: 2 },
        1: {
          id: 1,
          name: 'one',
          checklists: [
            { id: 1, name: 'name', items: [] },
            { id: 2, items: [], name: 'test' }
          ]
        }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should add list item', () => {
    const initial = {
      cards: {
        1: {
          id: 1,
          name: 'one',
          checklists: [
            { id: 1 },
            { id: 2, items: [{ id: 0, text: 't' }], name: 'test' }
          ]
        },
        2: { id: 2 }
      }
    }

    const state = cardsReducer(
      initial,
      cardsActions.addItem(1, 2, { id: 1, text: 'f' })
    )

    const expected = {
      cards: {
        2: { id: 2 },
        1: {
          id: 1,
          name: 'one',
          checklists: [
            { id: 1 },
            {
              id: 2,
              items: [
                { id: 0, text: 't' },
                { id: 1, text: 'f', checked: false }
              ],
              name: 'test'
            }
          ]
        }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should update list item', () => {
    const initial = {
      cards: {
        1: {
          id: 1,
          name: 'one',
          checklists: [
            { id: 1 },
            {
              id: 2,
              items: [
                { id: 0, text: 't' },
                { id: 1, text: 'f', checked: false }
              ],
              name: 'test'
            }
          ]
        },
        2: { id: 2 }
      }
    }

    const state = cardsReducer(
      initial,
      cardsActions.updateItem(1, 2, 1, { checked: true })
    )

    const expected = {
      cards: {
        2: { id: 2 },
        1: {
          id: 1,
          name: 'one',
          checklists: [
            { id: 1 },
            {
              id: 2,
              items: [
                { id: 0, text: 't' },
                { id: 1, text: 'f', checked: true }
              ],
              name: 'test'
            }
          ]
        }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should delete list item', () => {
    const initial = {
      cards: {
        1: {
          id: 1,
          name: 'one',
          checklists: [
            { id: 1 },
            {
              id: 2,
              items: [
                { id: 0, text: 't' },
                { id: 1, text: 'f', checked: false }
              ],
              name: 'test'
            }
          ]
        },
        2: { id: 2 }
      }
    }

    const state = cardsReducer(initial, cardsActions.deleteItem(1, 2, 0))

    const expected = {
      cards: {
        2: { id: 2 },
        1: {
          id: 1,
          name: 'one',
          checklists: [
            { id: 1 },
            {
              id: 2,
              items: [{ id: 1, text: 'f', checked: false }],
              name: 'test'
            }
          ]
        }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should delete label from all cards', () => {
    const initial = {
      cards: {
        1: {
          id: 1,
          labels: [1, 2, 3, 4]
        },
        2: { id: 2, labels: [1, 9, 10] },
        3: { id: 3, labels: [] }
      }
    }

    const state = cardsReducer(initial, cardsActions.deleteDeskLabel(1))

    const expected = {
      cards: {
        1: {
          id: 1,
          labels: [2, 3, 4]
        },
        2: { id: 2, labels: [9, 10] },
        3: {
          id: 3,
          labels: []
        }
      }
    }

    expect(state).toEqual(expected)
  })
})
