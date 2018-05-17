<template>
  <div class="header">
    <div class="logo-container">
      <img src="./logo.png" class="logo">
    </div>
    <div class="tab">
      <router-link tag="div" class="tab-item" to="/news">
        <span class="tab-link">首页</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/match">
        <span class="tab-link">比赛</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/data">
        <span class="tab-link">数据</span>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="scss" scoped>
@import '~common/scss/variable';

.header {
  display: flex;
  justify-content: space-between;
  position: fixed;
  height: 40px;
  width: 100%;
  background: $color-theme;
  .logo-container {
    position: relative;
    .logo {
      position: absolute;
      width: 61px;
      left: 15px;
      top: 30%;
    }
  }
  .tab {
    display: flex;
    height: 30px;
    width: 50%;
    .tab-item {
      position: relative;
      flex: 1;
      line-height: 40px;
      height: 40px;
      text-align: center;
      color: $color-theme-shallow;
      &.router-link-active {
        .tab-link {
          color: #fff;
        }
        &::after {
          position: absolute;
          content: '';
          left: 50%;
          bottom: 0px;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid #fff;
          margin-left: -5px;
        }
      }
    }
  }
}
</style>