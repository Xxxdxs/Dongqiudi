<template>
  <div class="data">
    <scroll ref="scroll" class="league" :data="leagues" :scrollX="true" :scrollY="false">
      <ul ref="wrapper">
        <li v-for="(item, index) in leagues" 
            :key="item.id" 
            v-text="item.name" 
            class="list-item" 
            :class="{'active': activeIndex === index}"
            @click="selectLeague(item.id, index)"></li>
      </ul>
    </scroll>
    <div class="toggle-container">
      <div class="toggle-wrapper">
        <toggle :data="toggle" @onclick="changeRank"></toggle>
      </div>
    </div>
    <team-rank v-if="contentTeam.template && toggle[0].isActive" :data="contentTeam"></team-rank>
    <person-rank v-if="contentPerson.template && toggle[1].isActive" :data="contentPerson"></person-rank>
  </div>
</template>

<script type="text/ecmascript-6">
import TeamRank from 'base/team-rank/team-rank'
import PersonRank from 'base/person-rank/person-rank'
import Toggle from 'base/toggle/toggle'
import Scroll from 'base/scroll/scroll'
import { getTeamPointRanking, getPersonRanking } from 'api/data'
import { LEAGUES } from 'api/config'
import bus from 'bus/bus'

const LEAGUE_ITEM_WIDTH = 80

export default {
  data() {
    return {
      contentTeam: {},
      contentPerson: {},
      toggle: [{
        name: '球队榜',
        isActive: true
      }, {
        name: '球员榜',
        isActive: false
      }],
      activeIndex: 0
    }
  },
  computed: {
    leagueID() {
      return bus.leagueID
    }
  },
  created() {
    this.leagues = LEAGUES
    this._getTeamPointRanking(this.leagueID)
  },
  mounted() {
    setTimeout(this._initialTab, 20)
  },
  methods: {
    changeRank(index) {
      this.toggle.forEach(el => { el.isActive = false })
      this.toggle[index].isActive = true
      this._getPersonRanking(this.leagueID)
    },
    selectLeague(id, index) {
      this.activeIndex = index
      bus.$emit('selectLeague', id)
      if (this.toggle[0].isActive) {
        this._getTeamPointRanking(this.leagueID)
      } else {
        this._getPersonRanking(this.leagueID)
      }
      this.$refs.scroll.scrollTo(this.activeIndex * -LEAGUE_ITEM_WIDTH)
    },
    _getTeamPointRanking(leagueID) {
      getTeamPointRanking(leagueID).then(res => {
        if (res.template) {
          this.contentTeam = res
        }
      })
    },
    _getPersonRanking(leagueID) {
      getPersonRanking(leagueID).then(res => {
        if (res.template) {
          this.contentPerson = res
        }
      })
    },
    _initialTab() {
      this.$refs.wrapper.style.width = this.leagues.length * LEAGUE_ITEM_WIDTH + 'px'
      this.$refs.scroll.refresh()
    }
  },
  components: {
    TeamRank, Toggle, Scroll, PersonRank
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/variable';

.data {
  position: fixed;
  width: 100%;
  top: 40px;
  bottom: 0;
  .league  {
    position: fixed;
    top: 40px;
    height: 32px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    ul {
      height: 100%;
      .list-item {
        position: relative;
        display: inline-block;
        width: 80px;
        height: 100%;
        line-height: 32px;
        color: rgb(87, 87, 87);
        text-align: center;
        vertical-align: middle;
        &.active {
          color: $color-theme;
          &::after {
            content: '';
            display: block;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 2em;
            height: 3px;
            background: $color-theme;
          }
        }
      }
    }
  }
  .toggle-container {
    position: fixed;
    top: 72px;
    height: 40px;
    width: 100%;
    background: rgb(50, 60, 70);
    .toggle-wrapper {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
    }
  }
}
</style>