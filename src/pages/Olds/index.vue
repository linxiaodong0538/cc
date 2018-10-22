<template>
  <div>
    <NavBar title="健康动态" />
    <div class="p-olds-trends o-box has-nav-bar has-tab-bar">
      <OldCard />
      <div class="c-tabs">
        <div class="c-tabs__nav fs4">
          <div
            class="c-tabs__nav-item"
            :class="{ 'is-active': cTabs.current === 0 }"
            @click="handleClickTabItem(0)">
            健康动态
          </div>
          <div
            class="c-tabs__nav-item"
            :class="{ 'is-active': cTabs.current === 1 }"
            @click="handleClickTabItem(1)">
            健康数据
          </div>
        </div>
        <div
          class="c-tabs__nav-line"
          :class="'is-' + cTabs.current">
        </div>
      </div>
      <div
        class="c-tabs__wrap"
        ref="wrapper">
        <div class="c-tabs__content o-grid">
          <ul class="c-news-list o-grid__cell">
            <li
              v-for="(item, index) in [0, 1]"
              :key="index"
              class="c-news-list__item">
              <div class="cc-card">
                <video
                  class="cc-card__video video-js vjs-big-play-centered"
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
          <div class="o-grid__cell">b</div>
        </div>
      </div>
    </div>
    <TabBar />
  </div>
</template>

<script>
  import videojs from 'video.js'
  import NavBar from '@/components/NavBar'
  import TabBar from '@/components/TabBar'
  import OldCard from '@/components/OldCard'
  import BScroll from 'better-scroll'

  export default {
    components: {
      NavBar,
      TabBar,
      OldCard
    },
    data () {
      return {
        cTabs: {
          current: 0
        }
      }
    },
    methods: {
      handleClickTabItem (index) {
        this.slider.goToPage(index)
      }
    },
    mounted () {
      this.$nextTick(() => {
        const videoPlayers = []
        const videos = document.getElementsByClassName('video-js')

        for (let i = 0; i < videos.length; i++) {
          videoPlayers[i] = videojs(videos[i], { preload: true })
        }

        this.slider = new BScroll(this.$refs.wrapper, {
          scrollX: true,
          eventPassthrough: 'vertical',
          snap: {
            loop: false,
            threshold: 0.1,
            stepX: window.screen.width
          }
        })

        this.slider.on('scrollEnd', () => {
          this.cTabs.current = this.slider.getCurrentPage().pageX
        })
      })
    }
  }
</script>

<style
  lang="scss"
  src="./styles/index.scss">
</style>
