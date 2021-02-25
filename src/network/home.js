
import request from './request'


// 封装获取轮播图数据请求
export function getSwiper(type=2) {
  return request({
    url:'/banner',
    params:{
      type
    }
  })
}

// 封装请求推荐歌单数据
export function getRecommend(limit=12) {
  return request({
    url:'/personalized',
    params: {
      limit
    }
  })
}

// 封装获取简洁榜单数据请求
export function getRankList() {
  return request({
    url:'/toplist'
  })
}

// 封装获取歌单详情
export function getListDetail(id) {
  return request({
    url:'/playlist/detail',
    params: {
      id
    }
  })
}

export class homeRank {
  constructor(playlist,tracks) {
    this.title = playlist.name;
    this.id = playlist.id;
    this.songList = tracks
  }
}