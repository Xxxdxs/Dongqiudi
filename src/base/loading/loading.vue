<template>
  <div class="loading">
    <img width="20" height="20" src="./loading.gif" alt="">
    <p class="desc">{{ title }}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.loading {
  width: 100%;
  text-align: center;
  .desc {
    line-height: 20px;
    font-size: $font-size-small;
    color: $color-text-desc;
  }
}
</style>