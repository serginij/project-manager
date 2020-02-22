import { teamsActions } from '@symbiotes/teams'

import { post } from '@lib/request'

import { parseDesk } from '../helpers'

export const parseMindmap = (mindmap, teamId) => {
  return dispatch => {
    return post('/mindmap/parse', {
      teamId: teamId,
      mindmap: mindmap
    })
      .then(res => {
        dispatch(parseDesk(teamId, res.desk, res.columns, res.cards))
      })
      .catch(err => {
        dispatch(teamsActions.getTeams.fail(err))
        console.log('parseMindmap err', err)
      })
  }
}
