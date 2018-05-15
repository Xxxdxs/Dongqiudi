'use strict'
const path = require('path')
const config = require('../config')
const cheerio = require('cheerio')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const puppeteer = require('puppeteer-cn')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

// 轮播图爬虫 
exports.slidersCrawler = function (html) {
  var $ = cheerio.load(html)

  var ret = {}
  ret.data = {}
  ret.data.slider = []

  var list = $('#show').find('li')
  if (list.children.length) {
    ret.code = 0
  }
  list.each(function () {
    var anchor = $(this).find('a')
    var _obj = {}
    _obj.linkUrl = anchor.attr('href')
    _obj.picUrl = anchor.find('img').attr('src')
    _obj.title = anchor.find('h3').text()
    _obj.id = _obj.linkUrl.match(/\/(\d*)\.html/)[1]
    ret.data.slider.push(_obj)
  })

  return ret
}
// End

// 新闻爬虫 
// 直接用cheerio爬取不了SSR渲染出来的一些东西 所以改用puppeteer....
// exports.newsCrawler = function (html) {
//   var $ = cheerio.load(html)
//   var ret = {}
//   ret.data = {}
//   $('.show-more').find('.show-more-btn').remove()
//   var result = $('.show-more')
//   if (result.children.length) {
//     ret.code = 0
//   }
//   ret.data = result.html()
//   return ret
// }

exports.newsCrawler = function (html) {
  return puppeteer.launch().then(async browser => {
    const page = await browser.newPage()
    await page.emulate({
      'userAgent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Mobile Safari/537.36',
      'viewport': {
        'width': 1920,
        'height': 1000000
      }
    })
    const ret = {}
    await page.goto(html)
    await page.waitForSelector('h1')
    ret.code = 0
    ret.data = await page.evaluate(async() => {
      const wait = (ms) => new Promise(resolve => setTimeout(() => resolve(), ms))
      const body = document.querySelector('body')
      for (let i = 0; i < body.clientHeight; i+= 1080) {
        window.scrollTo(0, i)
        await wait(100)
      }
      await wait(100)
      const anchor = document.querySelector('.show-more')
      return anchor.innerHTML
    })
    browser.close()
    return ret
  })
}
// End