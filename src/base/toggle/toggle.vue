<template>
  <div class="toggle">
    <ul>
      <li v-for="(item, index) in data" 
          :key="item.name" 
          :class="{'active': item.isActive}" 
          @click="select(index)"
          v-text="item.name"></li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    methods: {
      select(index) {
        this.$emit('onclick', index)
      }
    }
  }
</script>

<style lang="scss" scoped>
.toggle {
  position: relative;
  ul {
    font-size: 0;
  }
  li {
    display: inline-block;
    width: 50px;
    padding: 5px;
    background: rgb(50, 60, 70);
    font-size: 16px;
    color: rgb(143, 153, 170);
    border: 2px solid rgb(29, 35, 40);
    &.active {
      background: rgb(29, 35, 40);
      color: #fff;
    }
  }
  li:not(:first-child) {
    border-left: none;
  }
}
</style>