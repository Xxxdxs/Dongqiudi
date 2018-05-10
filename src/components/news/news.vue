<template>
  <div class="news">
    <scroll :data="newsList" class="news-content" ref="scroll" :pullup="pullup" @scrollOverEnd="searchMore" :listenScroll="true">
      <div>
        <div v-if="slider.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="(item,index) in slider" :key="index">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
                <h3 class="title">{{ item.title }}</h3>
              </a>
            </div>
          </slider>
        </div>
        <div class="news-list">
          <ul>
            <li @click="selectItem(item)" v-for="item in newsList" :key="item.id" class="item">
                <div class="icon">
                  <img width="90" height="67.5" v-lazy="{src: item.litpic}" alt="">
                </div>
                <div class="text">
                  <h2 class="title">{{ item.title }}</h2>
                  <p class="desc">{{ item.description }}</p>
                </div>
            </li>
            <loading v-show="hasMore && newsList.length" title="正在加载..."></loading>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!newsList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Slider from 'base/slider/slider'
import { getNewsList, getSliderList, getNews } from 'api/news'
import { ERR_OK } from 'api/config'

const MAX_PERPAGE_LENGTH = 15
const URL = `http://www.dongqiudi.com/share/article/`

export default {
  data() {
    return {
      page: 1,
      newsList: [],
      pullup: true,
      hasMore: true,
      slider: []
    }
  },
  created() {
    this._getNewsList()
    this._getSliderList()
    this._getNews()
  },
  methods: {
    loadImage() {
      if (!this.checkLoaded) {
        this.checkLoaded = true
        this.$refs.scroll.refresh()
      }
    },
    selectItem(item) {
      this.$router.push({
        path: `/news/${item.id}`
      })
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      getNewsList(this.page).then((res) => {
        if (res.list.articles.length) {
          this.newsList = this.newsList.concat(res.list.articles)
          this._checkMore(res.list.articles.length)
        }
      })
    },
    getLink(id) {
      return URL + `${id}?id=${id}&type=undefined&refer=m_website`
    },
    _getSliderList() {
      getSliderList().then((res) => {
        if (res.code === ERR_OK) {
          this.slider = res.data.slider
        }
      })
    },
    _getNewsList() {
      getNewsList(this.page).then((res) => {
        if (res.list.articles) {
          this.newsList = res.list.articles
        }
      })
    },
    _getNews() {
      getNews().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
        } else {
          console.log('no data')
        }
      })
    },
    _checkMore(length) {
      if (length < MAX_PERPAGE_LENGTH) {
        this.hasMore = false
      }
    }
  },
  components: {
    Scroll,
    Loading,
    Slider
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/variable';

.news {
  position: fixed;
  width: 100%;
  top: 40px;
  bottom: 0;
  .news-content {
    padding-top: 1px;
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      .title {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0px;
      line-height: 16px;
      color: #fff;
      background: rgba($color: #000000, $alpha: 0.3);
      text-align: left;
      font-size: $font-size-medium-x;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      }
      .title:after {
        content: '';
        display: block;
        height: 14px;
      }
    }
    .news-list {
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 10px 10px 10px 10px;
        a {
          display: flex;
        }
        .icon {
          flex: 0 0 90px;
          width: 90px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          .title {
            font-size: $font-size-medium-x;
            color: $color-text;
          }
          .desc {
            font-size: $font-size-small;
            color: $color-text-desc;
          }
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>