import { renderRoutes } from 'react-router-config'

import { Main } from '@components/main'
import MindMap from '@components/mindmap'

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
    }
  ])
