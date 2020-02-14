import { columnsActions, columnsReducer } from '../columns'

describe('auth reducer', () => {
  it('should store columns', () => {
    const initial = {
      columns: {},
      loading: true
    }

    const state = columnsReducer(
      initial,
      columnsActions.getColumns.done({ 1: { id: 1, name: 'one', cards: [] } })
    )

    const expected = {
      columns: { 1: { id: 1, name: 'one', cards: [] } },
      loading: false
    }

    expect(state).toEqual(expected)
  })

  it('should add column', () => {
    const initial = {
      columns: { 1: { id: 1, name: 'one', cards: [] } }
    }

    const state = columnsReducer(
      initial,
      columnsActions.addColumn({ id: 2, name: 'test' })
    )

    const expected = {
      columns: {
        1: { id: 1, name: 'one', cards: [] },
        2: { id: 2, name: 'test', cards: [] }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should update column', () => {
    const initial = {
      columns: { 1: { id: 1, name: 'one', cards: [] } }
    }

    const state = columnsReducer(initial, columnsActions.updateColumn(1, 'sec'))

    const expected = {
      columns: {
        1: { id: 1, name: 'sec', cards: [] }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should add card', () => {
    const initial = {
      columns: { 1: { id: 1, name: 'one', cards: [1] } }
    }

    const state = columnsReducer(initial, columnsActions.addCard(1, 4))

    const expected = {
      columns: {
        1: { id: 1, name: 'one', cards: [1, 4] }
      }
    }

    expect(state).toEqual(expected)
  })

  it('should delete card', () => {
    const initial = {
      columns: { 1: { id: 1, name: 'one', cards: [1, 2] } }
    }

    const state = columnsReducer(initial, columnsActions.deleteCard(1, 2))

    const expected = {
      columns: {
        1: { id: 1, name: 'one', cards: [1] }
      }
    }

    expect(state).toEqual(expected)
  })
})
