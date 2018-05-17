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

export function getArticle(id) {
  const url = `api/getArticle?id=${id}`

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    alert(err)
  })
}

export function preloadImg(str) {
  let loadedImg = 0
  let imgs = []
  let arr = str.match(/\ssrc=".*?"/g)
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      imgs[i] = new Image()
      imgs[i].src = arr[i].slice(6, -2)
      imgs[i].onload = () => {
        loadedImg++
        if (loadedImg === arr.length) {
          resolve()
        }
      }
    }
  })
}
