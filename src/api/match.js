import axios from 'axios'

export function getMatchList(date, scrollTimes) {
  const url = `https://www.dongqiudi.com/mobile/match/fetch_new`

  return axios.get(url, {
    params: {
      tab: 63,
      date: date,
      scroll_times: scrollTimes,
      tz: -8
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
