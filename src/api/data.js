import axios from 'axios'

export function getTeamPointRanking(seasonID) {
  const url = '/api/getTeamData'

  return axios.get(url, {
    params: {
      'season_id': seasonID,
      'version': 0,
      'refer': 'data_tab',
      'type': 'total_ranking',
      'from': 'msite_com'
    }
  }).then(res => {
    return Promise.resolve(res.data)
  }, err => {
    console.log(err)
  })
}

export function getPersonRanking(seasonID) {
  const url = '/api/getPersonData'

  return axios.get(url, {
    params: {
      'type': 'goals',
      'version': 152,
      'refer': 'person_ranking',
      'season_id': seasonID
    }
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
