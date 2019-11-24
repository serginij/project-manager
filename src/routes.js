import { renderRoutes } from 'react-router-config'

import { Main } from '@components/main'
import MindMap from '@components/mindmap'
import { Desk } from '@components/desk'
import { Team } from '@components/team'
import { CreateDesk } from '@components/desk/create-desk'
import { CreateTeam } from '@components/team/create-team'
import { Auth } from '@components/auth'
import { DeskSettings } from '@components/desk/desk-settings'
import { TeamSettings } from '@components/team/team-settings'

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
    },
    {
      component: CreateDesk,
      path: '/create-desk',
      exact: true
    },
    {
      component: CreateTeam,
      path: '/create-team',
      exact: true
    },
    {
      component: Auth,
      path: '/auth',
      exact: true
    },
    {
      component: DeskSettings,
      path: '/desk/settings/:deskId',
      exact: false
    },
    {
      component: TeamSettings,
      path: '/team/settings/:teamId',
      exact: false
    }
  ])
