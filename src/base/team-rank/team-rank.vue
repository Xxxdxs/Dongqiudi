<template>
  <div class="team-rank">
    <scroll class="content" :data="content.data">
      <div>
        <table class="table">
          <tr class="title">
            <td class="index"></td>
            <td v-for="tag in content.header" :class="classMap[tag]"  v-text="tag" :key="tag"></td>
            <td class="gap"></td>
          </tr>
          <tr v-for="(item, index) in content.data" :key="item.team_id" :class="{'top-color' : index < 3, 'bottom-color': index > content.data.length - 3}">
            <td class="index" v-text="index + 1"></td>
            <td class="team_name" >
              <span><img :src="item.team_logo" width="20px" height="20px" alt=""></span>
              <span v-text="item.team_name"></span>
            </td>
            <td class="matches_total" v-text="item.matches_total"></td>
            <td class="matches_won" v-text="item.matches_won"></td>
            <td class="matches_draw" v-text="item.matches_draw"></td>
            <td class="matches_lost" v-text="item.matches_lost"></td>
            <td class="pro_against" v-text="item.goals_pro + '/' + item.goals_against"></td>
            <td class="points" v-text="item.points"></td>   
            <td class="gap"></td>     
          </tr>
        </table>
        <div class="desc" v-text="desc"></div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'

  export default {
    data() {
      return {
      }
    },
    created() {
      this.classMap = {
        '球队': 'team_name',
        '赛': 'matches_total',
        '胜': 'matches_won',
        '平': 'matches_draw',
        '负': 'matches_lost',
        '进/失': 'pro_against',
        '积分': 'points'
      }
    },
    props: {
      data: {
        type: Object,
        default: {}
      }
    },
    computed: {
      content() {
        return this.data.content.rounds[0].content
      },
      desc() {
        return this.data.content.description
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.team-rank {
  position: fixed;
  top: 112px;
  bottom: 0;
  .content {
    overflow: hidden;
    height: 100%;
    background: rgb(50, 60, 70);
    .table {
      color: #eee;
      tr {
        line-height: 30px;
      }
      .title {
        background: rgb(63, 75, 86);
      }
      .top-color {
        background: $color-theme;
      }
      .bottom-color {
        background: rgb(64, 76, 87);
      }
      td {
        vertical-align: middle;
      }
      font-size: 12px;
      width: 100%;
      text-align: center;
      .index {
        min-width: 2em;
      }
      .team_name {
        width: 100%;
        text-align: left;
        span {
          display: inline-block;
          height: 100%;
          vertical-align: middle;
          img {
            vertical-align: middle;
          }
        }
      }
      .matches_total, .matches_won, .matches_draw, .matches_lost, .points{
        min-width: 2em;
      }
      .gap {
        min-width: 1em;
      }
      .pro_against {
        min-width: 3em;
      }
    }
    .desc {
      color: rgb(140, 150, 160);
      font-size: 12px;
      padding: 10px;
    }
  }
}
</style>