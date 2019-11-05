import { teamsActions } from '@symbiotes/teams'
import { desksActions } from '@symbiotes/desks'
import { request, post, del, update } from '@lib/request'

import {
  addDesk as createDesk,
  addColumn as createColumn,
  addCard as createCard
} from './helpers'
import { columnsActions } from './columns'
import { cardsActions } from './cards'

export const fetchTeams = () => {
  return dispatch => {
    dispatch(teamsActions.getTeams.start())

    return request('http://localhost:3000/teams')
      .then(res => {
        // console.log('effects.js: fetchTeams res', res)
        dispatch(teamsActions.getTeams.done(res.teams))
        dispatch(desksActions.getDesks.done(res.desks))
      })
      .catch(err => {
        console.log('effects.js: fetchTeams error', err)
        dispatch(teamsActions.getTeams.fail(err))
      })
  }
}

export const addDesk = name => {
  return dispatch => {
    return post('http://localhost:3000/desks', { teamId: 3, name: name }).then(
      res => {
        console.log(res)
        dispatch(createDesk(name, 3, res.id))
      }
    )
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

export const deleteColumn = columnId => {
  return dispatch => {
    return del(`http://localhost:3000/desks/columns/${columnId}`).then(res => {
      console.log('effects.js: deleteColumn res', res)
      dispatch(desksActions.deleteColumn(columnId))
    })
  }
}

export const addCard = (name, columnId) => {
  return dispatch => {
    return post('http://localhost:3000/desks/cards', {
      name: name,
      columnId: columnId
    })
      .then(res => {
        console.log(res)
        dispatch(createCard(name, columnId, res.id))
      })
      .catch(err => console.log(err))
  }
}

export const deleteCard = (columnId, cardId) => {
  return dispatch => {
    return del(`http://localhost:3000/desks/cards/${cardId}`).then(res => {
      console.log('effects.js: deleteCard res', res)
      dispatch(columnsActions.deleteCard(columnId, cardId))
    })
  }
}

export const updateCard = (cardId, columnId, name) => {
  return dispatch => {
    return update(`http://localhost:3000/desks/cards/${cardId}`, {
      name,
      columnId
    })
      .then(() => {
        dispatch(cardsActions.editCard({ name: name, id: cardId }))
      })
      .catch(err => console.log(err))
  }
}
