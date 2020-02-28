import { renderRoutes } from 'react-router-config'

import { Main } from '@components/main'
import { MindMapWrapper } from '@components/mindmap/'
import { Desk } from '@components/desk'
import { Team } from '@components/team'
import { CreateDesk } from '@components/desk/create-desk'
import { CreateTeam } from '@components/team/create-team'
import { Auth } from '@components/auth'
import { DeskSettings } from '@components/desk/desk-settings'
import { TeamSettings } from '@components/team/team-settings'
import { Signup } from '@components/auth/signup'
import { EditProfile } from '@components/user/edit-profile'
import { Stats } from '@components/desk/stats'

export const Routes = () =>
  renderRoutes([
    {
      component: Main,
      path: '/',
      exact: true
    },
    {
      component: MindMapWrapper,
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
    },
    {
      component: Signup,
      path: '/signup',
      exact: true
    },
    {
      component: EditProfile,
      path: '/edit-profile',
      exact: true
    },
    {
      component: Stats,
      path: '/stats',
      exact: false
    }
  ])
