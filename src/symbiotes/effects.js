import { teamsActions } from '@symbiotes/teams'
import { desksActions } from '@symbiotes/desks'
import { request, post } from '@lib/request'

import { addDesk as createDesk, addColumn as createColumn } from './helpers'
import { columnsActions } from './columns'
import { cardsActions } from './cards'

export const fetchTeams = () => {
  return dispatch => {
    dispatch(teamsActions.getTeams.start())

    return request('http://localhost:3000/teams/3')
      .then(res => {
        dispatch(teamsActions.getTeams.done(res.team))
        dispatch(desksActions.getDesks.done(res.desks))
      })
      .catch(err => dispatch(teamsActions.getTeams.fail(err)))
  }
}

export const addDesk = name => {
  return dispatch => {
    return post('http://localhost:3000/desks', { teamId: 3, name: name })
      .then(res => {
        console.log(res)
        dispatch(createDesk(name, 3, res.id))
      })
      .catch(err => console.log(err))
  }
}

export const getDesk = id => {
  return dispatch => {
    return request(`http://localhost:3000/desks/${id}`)
      .then(res => {
        console.log(res)
        dispatch(desksActions.updateDesk(res.desk))
        dispatch(columnsActions.getColumns.done(res.columns))
        dispatch(cardsActions.getCards.done(res.cards))
        dispatch(desksActions.setCurrentDesk(id))
      })
      .catch(err => console.log(err))
  }
}

export const addColumn = (name, deskId) => {
  return dispatch => {
    return post('http://localhost:3000/desks/columns', {
      name: name,
      deskId: deskId
    })
      .then(res => {
        console.log(res)
        dispatch(createColumn(name, deskId, res.id))
      })
      .catch(err => console.log(err))
  }
}
