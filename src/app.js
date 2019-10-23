import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import { Routes } from './routes'
import { history } from './lib/routing'
import { configureStore } from './store'

import { Header } from '@components/header'

const store = configureStore()

export const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Header />
      <Routes />
    </Router>
  </Provider>
)
