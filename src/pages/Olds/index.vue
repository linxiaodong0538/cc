<template>
  <div>
    <NavBar title="健康动态" />
    <div class="p-olds o-box has-nav-bar has-tab-bar">
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
              v-for="(videos, index) in OldVideoList.items"
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
                  <div class="cc-card__title fs8">{{videos.title}}</div>
                  <div class="cc-card__desc c8 fs4">{{videos.description}}</div>
                  <div class="cc-card__time c3 fs2">{{ videos.created_at | date }}</div>
                </div>
              </div>
            </li>
          </ul>
          <div class="o-grid__cell">
            <ul class="pb-data o-wrap">
              <li
                v-for="(list, index) in oldHealthRecordsLists"
                :key="index"
                class="pb-data__item">
                <block v-if="!!list.items.length">
                  <h2 class="pb-data__title fs18">{{ list.items[0].value }}</h2>
                  <p class="pb-data__body fs4">
                    <span class="fs4 c5">{{ $consts.HEALTH_INDICATORS[list.indicator].name }}</span>
                    <span class="fs1 c3">{{ $consts.HEALTH_INDICATORS[list.indicator].unit }}</span>
                  </p>
                  <div class="pb-data__time fs2 c3">{{ list.items[0].created_at | date }}</div>
                </block>
                <block v-else>
                  <h2 class="pb-data__title fs18">-</h2>
                  <p class="pb-data__body fs4">
                    <span class="fs4 c5">{{ $consts.HEALTH_INDICATORS[list.indicator].name }}</span>
                    <span class="fs1 c3">{{ $consts.HEALTH_INDICATORS[list.indicator].unit }}</span>
                  </p>
                  <div class="pb-data__time fs2 c3">-</div>
                </block>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <TabBar />
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  import TabBar from '@/components/TabBar'
  import OldCard from '@/components/OldCard'
  import videojs from 'video.js'
  import BScroll from 'better-scroll'

  export default {
    components: {
      NavBar,
      TabBar,
      OldCard
    },
    data () {
      return {
        oldHealthRecordsLists: [],
        OldVideoList: [],
        cTabs: {
          current: 0
        }
      }
    },
    async created () {
      this.oldHealthRecordsLists = [
        await this.getOldHealthRecordsList(1),
        await this.getOldHealthRecordsList(2),
        await this.getOldHealthRecordsList(3),
        await this.getOldHealthRecordsList(4),
        await this.getOldHealthRecordsList(5)
      ]
        .sort((item1, item2) => item1.items.length && item2.items.length
          ? item1.items[0].id - item2.items[0].id
          : -1)
      this.OldVideoList = await this.getOldVideoList()
    },
    methods: {
      async getOldHealthRecordsList (num) {
        const getListRes = await this.$store.dispatch('oldHealthRecords/getList', {
          query: {
            where: {
              indicator: { $eq: num },
              oldId: '2588'
            }
          }
        })

        return { ...getListRes, indicator: num }
      },
      async getOldVideoList () {
        const getVideoRes = await this.$store.dispatch('videos/getList', {
          query: {
            where: {
              oldId: '2588'
            }
          }
        })

        return getVideoRes
      },
      initVideos () {
        const videoPlayers = []
        const videos = document.getElementsByClassName('video-js')

        for (let i = 0; i < videos.length; i++) {
          videoPlayers[i] = videojs(videos[i], { preload: true })
        }
      },
      initSlider () {
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
      },
      handleClickTabItem (index) {
        this.slider.goToPage(index)
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.initVideos()
        this.initSlider()
      })
    }
  }
</script>

<style
  lang="scss"
  src="./styles/index.scss">
</style>
