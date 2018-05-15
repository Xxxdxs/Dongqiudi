import Vue from 'vue'

export default new Vue({
  data: {
    id: 0,
    leagueID: 10219
  },
  created() {
    this.$on('selectItem', (id) => {
      this.id = id
    })
    this.$on('selectLeague', (id) => {
      this.leagueID = id
    })
  }
})
