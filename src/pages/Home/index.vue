<template>
  <div>
    <div
      class="p-home o-box"
      ref="wrapper">
      <swiper
        :options="swiperOption"
        @slideChangeTransitionEnd="handleSlideChangeTransitionEnd">
        <swiper-slide
          v-for="(item, index) in [0, 1]"
          :key="index"
          class="pb-video__wrap"
          :style="videoStyle">
          <video
            class="pb-video video-js vjs-big-play-centered"
            :poster="preview(index)"
            muted
            data-setup="{}">
            <source
              type="video/mp4"
              src="http://cyyl-xd.liruan.cn/1.mp4" />
          </video>
          <div
            class="pb-video__overlay"
            @click="handleClickPlay(index)">
          </div>
          <div class="pb-button pb-button--praise">
            <div class="pb-button__num c4 fs2">{{ index + 1 }}</div>
            <div class="pb-button__text c1 fs2">点赞</div>
          </div>
          <div
            class="pb-button pb-button--comment"
            @click.stop="handleClickComment">
            <div class="pb-button__num c4 fs2">88</div>
            <div class="pb-button__text c1 fs2">
              评论
            </div>
          </div>
          <div class="pb-title c1 fs10">世界上最美的十大海岛排行榜，带您领略惊世之美</div>
          <div class="pb-address c1 fs2">福州 · 闽侯重阳养老院</div>
          <div class="pb-time c1 fs2">2018年09月19日</div>
        </swiper-slide>
      </swiper>
      <div
        v-show="cTexterea.visible"
        class="c-overlay">
      </div>
      <div
        v-show="cTexterea.visible"
        class="c-textarea-wrap"
        @click.stop="() => {}">
        <textarea
          class="c-textarea fs4"
          placeholder="输入您的评论">
        </textarea>
        <Padding
          size="lg"
          :dirs="[ 'left', 'right' ]">
          <div
            class="c-button c-button--1 c1 fs6"
            @click="handleSubmitComment">
            提交
          </div>
        </Padding>
      </div>
    </div>
    <TabBar />
  </div>
</template>

<script>
  import videojs from 'video.js'
  import TabBar from '@/components/TabBar'
  import Padding from '@/components/Padding'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  const videoPlayers = []

  export default {
    components: {
      TabBar,
      Padding,
      swiper,
      swiperSlide
    },
    data () {
      return {
        cTexterea: {
          visible: false
        },
        formData: {
          content: ''
        },
        swiperOption: {
          scrollContainer: true,
          momentumBounce: false
        }
      }
    },
    computed: {
      videoStyle () {
        return {
          width: `${window.screen.width}px`,
          height: `${window.screen.height}px`
        }
      }
    },
    methods: {
      handleClickComment () {
        this.cTexterea.visible = true
      },
      handleSubmitComment () {
        this.$toast('提交成功')
        this.cTexterea.visible = false
      },
      preview (index) {
        return 'http://localhost:88/pages/home/preview-' + index + '.jpg'
      },
      handleSlideChangeTransitionEnd () {
        for (let i = 0; i < videoPlayers.length; i++) {
          videoPlayers[i].pause()
        }
      },
      handleClickPlay (index) {
        const currentVideo = videoPlayers[index]

        if (currentVideo.paused()) {
          currentVideo.play()
        } else {
          currentVideo.pause()
        }
      }
    },
    mounted () {
      const videos = document.getElementsByClassName('video-js')

      for (let i = 0; i < videos.length; i++) {
        videoPlayers[i] = videojs(videos[i], { preload: true })
      }

      document.getElementById('app').addEventListener('click', () => {
        this.cTexterea.visible = false
      })
    }
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
