<template>
  <div class='play-bg'>
    <img :src="picUrl" alt="">
  </div>
</template>

<script>

export default {
  name:"PlayBg",
  props:{
    picUrl:String
  }
  }
</script>

<style lang="scss" scoped>
  .play-bg {
    position:absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    filter: blur(40px) contrast(60%);
    z-index: -1;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>