import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { css } from 'linaria'

import { Routes } from './routes'
import { history } from './lib/routing'
import { configureStore } from './store'

import { CommonContent } from './ui'

const store = configureStore()

export const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <CommonContent className={styles}>
        <Routes />
      </CommonContent>
    </Router>
  </Provider>
)

const styles = css`
  font-family: serif;
`
