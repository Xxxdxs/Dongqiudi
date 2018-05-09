<template>
  <scroll class="listview" :data="data" :listenScroll="true" @scroll="scroll" :probeType="3" ref="listview" :pullup="true" @scrollOverEnd="scrollOverEnd">
    <ul>
      <li class="list-group" v-for="group in data" :key="group.date" ref="listGroup">
        <h2 class="list-group-title">{{ group.date }}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.matches" :key="item.id">
            <div class="team">
              <img v-lazy="{src: item.team_A.logo, loading: homeTeam}" alt="" width="50" height="50" class="avatar">
              <span class="name">{{ item.team_A.name }}</span>
            </div>
            <div class="match-detail">
              <span class="time">{{ item.local_time + ' ' + item.competition.short_name }}</span>
              <span class="score">{{ item.result }}</span>
              <span class="result">{{ item.status === 'Played'? '已结束' : '未开始' }}</span>
            </div>
            <div class="team">
              <img v-lazy="{src: item.team_B.logo, loading: swayTeam}" alt="" width="50" height="50" class="avatar">
              <span class="name">{{ item.team_B.name }}</span>
            </div>
          </li>
        </ul>
      </li>
      <loading v-show="hasMore && data.length" title="正在加载..."></loading>
    </ul>
    <div class="list-fixed" v-show="fixedTitle" ref="fixedTitle">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { homeTeamImg, swayTeamImg } from 'common/image/loadingImg'

const TITLE_HEIGHT = 30

export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    hasMore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentIndex: 0,
      scrollY: 0,
      diff: 0,
      homeTeam: homeTeamImg,
      swayTeam: swayTeamImg
    }
  },
  created() {
    this.listHeight = []
  },
  computed: {
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].date : ''
    }
  },
  methods: {
    scrollOverEnd() {
      this.$emit('scrollOverEnd')
    },
    scroll(pos) {
      this.scrollY = pos.y
      this.$emit('scroll')
    },
    _caculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._caculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < listHeight.length - 1; i++) {
        if ((-newY >= listHeight[i]) && (-newY < listHeight[i + 1])) {
          this.currentIndex = i
          this.diff = listHeight[i + 1] + newY
          return
        }
      }
      this.currentIndex = listHeight.length - 2
    },
    diff(newValue) {
      let fixTop = (newValue > 0 && newValue < TITLE_HEIGHT) ? newValue - TITLE_HEIGHT : 0
      if (this.fixTop === fixTop) {
        return
      }
      this.fixTop = fixTop
      this.$refs.fixedTitle.style.transform = `translate3d(0, ${fixTop}px, 0)`
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .list-group {
    .list-group-title {
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: $font-size-small;
      color: $color-text-title;
      background: $color-background-d;
    }
    .list-group-item {
      display: flex;
      justify-content: space-around;
      align-items: stretch;
      padding: 10px 0 6px 0;
      border-bottom: 1px solid $color-background-d;
      .team {
        display: flex;
        flex: 0 0 80px;
        flex-direction: column;
        justify-content: center;
        .avatar {
          margin: 0 auto 10px auto;
          width: 50px;
          height: 50px;
        }
        .name {
          text-align: center;
          color: $color-text-title;
          font-size: $font-size-small;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      &:last-child {
        border-bottom: none;
      }
      .match-detail {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .time {
          font-size: $font-size-small;
          text-align: center;
          color: #999;
        }
        .score {
          font-size: $font-size-large-xxx;
          text-align: center;
          font-weight: bold;
          color: #000;
        }
        .result {
          font-size: $font-size-small;
          text-align: center;
          color: #999;
        }
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: $font-size-small;
      color: $color-text-title;
      background: $color-background-d;
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