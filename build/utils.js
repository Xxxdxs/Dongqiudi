'use strict'
const path = require('path')
const config = require('../config')
const cheerio = require('cheerio')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
    ret.data.slider.push(_obj)
  })

  return ret
}
// End

// 新闻爬虫 
exports.newsCrawler = function (html) {
  var $ = cheerio.load(html)
  var ret = {}
  ret.data = {}
  // ret.data.news = []
  // 有些段落可能含有其他标签
  // var list = $('.con').find('p')
  // if (list.children.length) {
  //   ret.code = 0
  // }
  // list.each(function () {
  //   var _obj = {}
  //   if ($(this).find('img').length) {
  //     _obj.tag = 'img'
  //     _obj.src = $(this).find('img').attr('data-src')
  //     _obj.originSrc = $(this).find('img').attr('orig-src')
  //   } else {
  //     _obj.tag = 'p'
  //     _obj.content = $(this).html()
  //   }
  //   ret.data.news.push(_obj)
  // })
  var result = $('.show-more')
  if (result.children.length) {
    ret.code = 0
  }
  ret.data = result.html()
  return ret
}
// End