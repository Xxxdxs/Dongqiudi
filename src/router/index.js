import Vue from 'vue'
import Router from 'vue-router'
import News from 'components/news/news'
import Match from 'components/match/match'
import Data from 'components/data/data'
import Article from 'components/article/article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/news',
      component: News
    },
    {
      path: '/news',
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
      path: '/data',
      component: Data
    }
  ]
})
