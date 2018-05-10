import Vue from 'vue'
import Router from 'vue-router'
import News from 'components/news/news'
import Match from 'components/match/match'
import Video from 'components/video/video'
import Data from 'components/data/data'
import Article from 'components/article/article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/news',
      component: News // component写成了components
    },
    {
      path: '/news', // 忘记添加News
      component: News,
      children: [
        {
          path: ':id',
          component: Article
        }
      ]
    },
    {
      path: '/match',
      component: Match
    },
    {
      path: '/video',
      component: Video
    },
    {
      path: '/data',
      component: Data
    }
  ]
})
