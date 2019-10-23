import { createStore, applyMiddleware, compose } from 'redux'
import { reducer } from './reducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = [thunk]

export const configureStore = (initialState = {}) => {
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  return store
}
