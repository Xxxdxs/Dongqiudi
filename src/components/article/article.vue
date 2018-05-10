<template>
  <div class="article">
    <div class="header">
      <div class="back" @click="back">
      </div>
      <div class="logo-container">
        <img src="./logo.png" class="logo">
      </div>
    </div>
    <div class="content" v-html="content">
      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      content: ''
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/variable';

.article {
  position: fixed;
  z-index: 0;
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
}
</style>
