// var http = require('http')
// var url = 'http://www.dongqiudi.com'
// var cheerio = require('cheerio')
// var axios = require('axios')

// function _getSliders(html) {
//   var $ = cheerio.load(html)

//   var ret = {}
//   ret.data = {}
//   ret.data.slider = []

//   var list = $('#show').find('li')
//   if (list.children.length) {
//     ret.code = 0
//   }
//   list.each(function () {
//     var anchor = $(this).find('a')
//     var _obj = {}
//     _obj.linkUrl = anchor.attr('href')
//     _obj.picUrl = anchor.find('img').attr('src')
//     _obj.title = anchor.find('h3').text()
//     ret.data.slider.push(_obj)
//   })

//   return ret
// }

// http.get(url, function (res) {
//   var html = ''
//   res.on('data', function (data) {
//     html += data
//   })
//   res.on('end', function () {
//     var ret = _getSliders(html)
//     console.log(ret.data.slider)
//   })
// }).on('error', function () {
//   console.log('出错啦~~~~~~~~')
// })
//
// 临时注释
// axios.get(url).then(function (res) {
//   console.log(_getSliders(res.data))
// })

// var test = 'https://y.qq.com/download/download.js?jsonpCallback=MusicJsonCallback&loginUin=776530912&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'

// axios.get(test).then(function (res) {
//   console.log(res.data)
// }).catch(function (err) {
//   console.log(err)
// })

const url = `https://3g.163.com/news/article/`
const express = require('express')
const axios = require('axios')
const apiRoutes = express.Router()

// apiRoutes.get(/\/article\/([A-Za-z0-9]+)$/, function (req, res) {
//   var id = req.params[0]
//   axios.get(url + id + '.html').then((response) => {
//     res.send(response.data)
//   }).catch((e) => {
//     console.log(e)
//   })
// })

apiRoutes.get('/article/:id', function (req, res) {
  var id = req.params.id
  axios.get(url + id + '.html').then((response) => {
    res.send(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

const app = express()

app.get('/', function (req, res) {
  res.send('Hello world!\n 请复制https://127.0.0.1:3000/api/article/D13ERMMO00018AOQ.html')
})
app.use('/api', apiRoutes)

app.listen(3000, function () {
  console.log('listening at http://127.0.0.1:3000')
})
