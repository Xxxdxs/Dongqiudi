import axios from 'axios'

export function getNewsList(page = 1) {
  const url = 'https://www.dongqiudi.com/mobile/tab/1/archives' + `?page=${page}`

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSliderList() {
  const url = '/api/getSliders'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getNews() {
  const url = 'api/getNews'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
