<template>
  <div class='lyric'>
    <scroll class="lyric-box" ref="scroll">
        <div class="content" ref="content">
          <div v-for="(item,index) in data" :key="index" class="line" :class="{'now-time':index === $store.state.currentLine-1}" ref="item">
            <p class="lrc">{{item.msg}}</p>
            <p class="tlrc" v-if="item.tmsg">{{item.tmsg}}</p>
          </div>
        </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll/Scroll'
export default {
  name:"Lyric",
  components:{
    Scroll
  },
  props:{
    lyric:{
      type:Array,
      default() {
        return []
      }
    },
    
  },
  data () {
    return {
      data:[],
      // 解决再次进入页面歌词跳转到指定位置，保存到vuex
      // currentLine:0,
      height: 0 ,
      duration: 0,
      index:0
    };
  },
  watch: {
    lyric() {
      this.data = this.lyric
    },
  },  
  mounted() {
    /*
    const h = window.innerHeight
    console.log("1:",h);  // 从homerank 进来播放 iphone6 1334
    console.log(window);  // window对象中的又是 667 
    不知道为什么从home排行榜进播放界面 获取的 window.innerHeight 不正确 ，其他界面进入获取的又是正确的
    */
    this.$bus.$on('playingsong',data => {
      this.height = (window.innerHeight - 180) / 2
      this.duration = data.duration
      if (this.data.length > 0 && this.$store.state.currentLine <this.data.length && data.currentTime >= this.data[this.$store.state.currentLine].time) {
        if (this.$store.state.currentLine <= this.data.length - 1) {
          this.$refs.scroll && this.$refs.scroll.scrollTo(0,-this.$refs.item[this.$store.state.currentLine].offsetTop + this.height,0)
          this.$store.commit("setLine",this.$store.state.currentLine+=1)
        }else {
          this.$store.commit("setLine",this.data.length-1)
        }
      }
    })
    this.$bus.$on('nextSong',() => {
      this.data = []
      this.$store.commit("setLine",0)
      this.$refs.scroll.scrollTo(0,0,0)
    })
    this.$bus.$on('oneSong',()=> {
      this.data = []
      this.$store.commit("setLine",0)
      this.$refs.scroll.scrollTo(0,0,0)
    })
    this.$bus.$on('seekTo',percent => {
      // 默认会有一句的，纯音乐，或者暂无歌词，所以要大于1
      // if (this.data.length> 1) {
        //由于可能有最后一句空白行，但是他的时间是刚好为最后一句歌词的结束，就会找不到大于的行，返回-1，在监听播放时滚动和读取对应数组[-1]就会报错
        let lines = this.data.findIndex(item => item.time >= percent*this.duration)
        lines = lines === -1 ? this.data.length - 1 : lines
        this.$store.commit("setLine",lines)
        this.$nextTick(()=> {
          this.$refs.scroll && this.$refs.scroll.scrollTo(0,-this.$refs.item[this.$store.state.currentLine].offsetTop + this.height,100)
        })
      // }
    })
  },
  activated() {
    this.$refs.scroll && this.$refs.scroll.scrollTo(0,-this.$refs.item[this.$store.state.currentLine].offsetTop + this.height,0)
  }
  }
</script>

<style lang="scss" scoped>
.lyric {
  width: 100vw;
  height: calc(100vh - 180px);
  .lyric-box {
    overflow: hidden;
    width: 100%;
    height: calc(100% - 22px);
    text-align: center;
    color: rgba(255, 255, 255,.7);
    .content {
      position: relative;
      width: 90%;
      margin: 0 auto;
      padding-top: calc(50vh - 111px);
      padding-bottom: calc(50vh - 81px);
      .line {
        margin: 15px;
        font-size: 14px;
        .lrc {
          line-height: 20px;
        }
        .tlrc {
          line-height: 20px;
        }
      }
      .now-time {
        font-size: 16px;
        font-weight: 600;
        color: #fff;
      }
    }
  }
}
  
</style>