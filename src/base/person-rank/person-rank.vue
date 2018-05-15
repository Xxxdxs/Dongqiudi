<template>
  <div class="person-rank">
   <scroll class="content" :data="content.data">
      <div>
        <table class="table">
          <tr class="title">
            <td class="index"></td>
            <td v-for="tag in content.header" :class="classMap[tag]"  v-text="tag" :key="tag"></td>
            <td class="gap"></td>
          </tr>
          <tr v-for="(item, index) in content.data" :key="item.person_id">
            <td class="index" v-text="index + 1"></td>
            <td class="player" >
              <span><img :src="item.person_logo" width="20px" height="20px" alt=""></span>
              <span v-text="item.person_name"></span>
            </td>
            <td class="team" v-text="item.team_name"></td>
            <td class="goals" v-text="item.count"></td>
            <td class="gap"></td>        
          </tr>
        </table>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'

  export default {
    props: {
      data: {
        type: Object,
        default: {}
      }
    },
    computed: {
      content() {
        return this.data.content
      }
    },
    created() {
      this.classMap = {
        '球员': 'player',
        '球队': 'team',
        '进球': 'goals'
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="scss" scoped>
.person-rank {
  position: fixed;
  top: 112px;
  bottom: 0;
  .content {
    height: 100%;
    overflow: hidden;
    background: rgb(50, 60, 70);
    .table {
      color: #eee;
      font-size: 12px;
      width: 100%;
      text-align: center;
      tr {
        line-height: 30px;
        &.title {
        background: rgb(63, 75, 86);
        }
        td {
          vertical-align: middle;
          &.index {
            min-width: 2em;
          }
          &.player {
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
          &.team {
            min-width: 10em;
          }
          &.goals {
            min-width: 2em;
          }
          &.gap {
            min-width: 2em;
          }
        }
      }
      
    }
  }
}
</style>