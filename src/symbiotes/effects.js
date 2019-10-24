import { teamsActions } from '@symbiotes/teams'
import { request } from '@lib/request'

export const fetchTeams = () => {
  return dispatch => {
    dispatch(teamsActions.getTeams.start())

    return request('http://localhost:3000/teams')
      .then(res => dispatch(teamsActions.getTeams.done(res)))
      .catch(err => dispatch(teamsActions.getTeams.fail(err)))
  }
}
