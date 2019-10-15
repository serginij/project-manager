import React from 'react'
import { Router } from 'react-router'

import { Routes } from './routes'
import { history } from './lib/routing'

import { Header } from '@components/header'

export const App = () => (
  <Router history={history}>
    <Header />
    <Routes />
  </Router>
)
