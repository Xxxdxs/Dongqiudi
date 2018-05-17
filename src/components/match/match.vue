<template>
  <div class="match">
    <listview :data="matchList" @scrollOverEnd="scrollOverEnd" :hasMore="hasMore">
    </listview>
  </div>
</template>

<script type="text/ecmascript-6">
import Listview from 'base/listview/listview'
import { getMatchList } from 'api/match'

export default {
  data() {
    return {
      matchList: [],
      hasMore: true
    }
  },
  created() {
    this.nextDate = this._normalizeDate(new Date())
    this.scrollTimes = 0
    this._getMatchList()
  },
  methods: {
    scrollOverEnd() {
      getMatchList(this.nextDate, this.scrollTimes).then((res) => {
        if (res.matches) {
          this.matchList = this.matchList.concat(this._normalize(res.matches))
          this.nextDate = res.next_date
          this.scrollTimes = 1
        } else {
          this.hasMore = false
        }
      })
    },
    _normalizeDate(date) {
      // return date.toLocaleDateString().replace(/\//g, '-') QQ UC浏览器获取了英文的日期
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
    _getMatchList() {
      getMatchList(this.nextDate, this.scrollTimes).then((res) => {
        if (res.matches) {
          this.matchList = this._normalize(res.matches)
          this.nextDate = res.next_date
          this.scrollTimes = 1
        }
      })
    },
    _normalize(obj) {
      let ret = []
      for (let k in obj) {
        ret.push({
          date: k,
          matches: obj[k]
        })
      }
      return ret
    }
  },
  components: {
    Listview
  }
}
</script>

<style lang="scss" scoped>
.match {
  position: fixed;
  top: 40px;
  bottom: 0;
  width: 100%;
}
</style>