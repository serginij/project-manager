import { createSymbiote } from 'redux-symbiote'

const initialState = {
  loading: false,
  desks: [
    {
      name: 'One',
      id: 123
    },
    {
      name: 'Two',
      id: 143
    },
    {
      name: 'Three',
      id: 334
    }
  ],
  error: null
}

const symbiotes = {
  getDesks: {
    start: state => ({ ...state, loading: true }),
    fail: (state, error) => ({ ...state, loading: false, error: error }),
    done: (state, desks) => ({ ...state, loading: false, teams: desks })
  }
}

export const { actions: desksActions, reducer: desksReducer } = createSymbiote(
  initialState,
  symbiotes,
  '@@desks'
)
