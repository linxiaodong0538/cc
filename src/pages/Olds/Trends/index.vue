<template>
  <div>
    <NavBar title="健康动态" />
    <div class="p-olds-trends o-box has-nav-bar has-tab-bar">
      <OldCard />
      <ul class="c-tabs fs4">
        <li class="c-tabs__item is-active">
          <span>健康动态</span>
        </li>
        <li
          class="c-tabs__item"
          @click="$router.push('/olds/data')">
          <span>健康数据</span>
        </li>
      </ul>
      <ul class="c-news-list">
        <li
          v-for="(item, index) in [0, 1]"
          :key="index"
          class="c-news-list__item">
          <div class="cc-card">
            <video
              class="cc-card__video video-js vjs-big-play-centered"
              :poster="preview(index)"
              controls
              data-setup="{}">
              <source
                type="video/mp4"
                src="http://cyyl-xd.liruan.cn/1.mp4" />
            </video>
            <div class="cc-card__body">
              <div class="cc-card__title fs8">国际先进养老理念</div>
              <div class="cc-card__desc c8 fs4">引进美国先进的养老经验，结合国内养老特点</div>
              <div class="cc-card__time c3 fs2">2018-03-17</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <TabBar />
  </div>
</template>

<script>
  import videojs from 'video.js'
  import NavBar from '@/components/NavBar'
  import TabBar from '@/components/TabBar'
  import OldCard from '@/components/OldCard'

  const videoPlayers = []

  export default {
    components: {
      NavBar,
      TabBar,
      OldCard
    },
    methods: {
      preview (index) {
        return 'http://localhost:88/pages/home/preview-' + index + '.jpg'
      }
    },
    mounted () {
      const videos = document.getElementsByClassName('video-js')

      for (let i = 0; i < videos.length; i++) {
        videoPlayers[i] = videojs(videos[i], { preload: true })
      }
    }
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
