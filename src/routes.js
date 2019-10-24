import { renderRoutes } from 'react-router-config'

import { Main } from '@components/main'
import MindMap from '@components/mindmap'
import { Desk } from '@components/desk'
import { Team } from '@components/team'

export const Routes = () =>
  renderRoutes([
    {
      component: Main,
      path: '/',
      exact: true
    },
    {
      component: MindMap,
      path: '/mindmap',
      exact: true
    },
    {
      component: Desk,
      path: '/desks/:deskId',
      exact: false
    },
    {
      component: Team,
      path: '/teams/:teamId',
      exact: false
    }
  ])
