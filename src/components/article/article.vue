<template>
  <div class="article">
    <div class="header">
      <div class="back" @click="back">
      </div>
      <div class="logo-container">
        <img src="./logo.png" class="logo">
      </div>
    </div>
    <scroll :data="Array.of(content)" ref="scroll" class="article-content">
      <div class="content" v-html="content" ref="content">
      </div>
    </scroll>
    <div class="loading-container" v-show="!content.length">
      <loading></loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import bus from 'bus/bus'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getArticle, preloadImg } from 'api/news'
import { ERR_OK } from 'api/config'

export default {
  data() {
    return {
      content: ''
    }
  },
  computed: {
    id() {
      return bus.id
    }
  },
  created() {
    this._getArticle()
  },
  methods: {
    back() {
      this.$router.back()
    },
    _getArticle() {
      if (!this.id) {
        this.$router.push('/')
        return
      }
      getArticle(this.id).then((res) => {
        if (res.code === ERR_OK) {
          this.content = res.data
          return res.data
        }
      }).then((html) => {
        preloadImg(html).then(() => {
          this.$refs.scroll.refresh()
        })
      })
    }
  },
  components: {
    Scroll, Loading
  }
}
</script>

<style lang="scss">
@import '~common/scss/variable';

.article {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  .header {
    position: relative;
    height: 40px;
    background: $color-theme;
    text-align: center;
    .back {
      position: absolute;
      left: 5px;
      width: 40px;
      height: 40px;
      background-image: url(back2.png);
      background-size: 40px 40px;
    }
    .logo-container {
      height: 40px;
      .logo {
        position: relative;
        height: 18px;
        top: 11px;
      }
    }
  }
  .article-content {
    height: calc(100% - 40px);
    overflow: hidden;
    .content {
      padding: 0.5em;
      h1 {
        margin-bottom: 1em;
        font-size: $font-size-large-xxx;
      }
      h2, h3, h4{
        margin-bottom: 1em;
        font-size: $font-size-large-x;
      }
      h5 {
        margin-bottom: 1em;
        font-size: $font-size-large;
      }
      p {
        margin-bottom: 1em;
        text-indent: 2em;
      }
      .title {
        font-size: 14px;
        .writer {
          margin-right: 10px;
          color: $color-theme;
        }
        time {
          color: #999;
        }
      }
      .hao-title {
        margin-bottom: 1em;
        font-size: 14px;
        img {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .writer {
          margin-right: 10px;
          color: $color-theme;
        }
        time {
          color: #999;
        }
      }
      .con {
        img {
          width: 100%;
        }
      }
      .sourse {
        color: #999;
        font-style: italic;
      }
      .show-more-btn {
        display: none;
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
</style>
