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
        <li class="c-news-list__item">
          <div class="cc-card">
            <img
              class="cc-card__video"
              src="./styles/images/video.png" />
            <div class="cc-card__body">
              <div class="cc-card__title fs8">国际先进养老理念</div>
              <div class="cc-card__desc c8 fs4">引进美国先进的养老经验，结合国内养老特点</div>
              <div class="cc-card__time c3 fs2">2018-03-17</div>
            </div>
          </div>
        </li>
        <li class="c-news-list__item">
          <div class="cc-card">
            <img
              class="cc-card__video"
              src="./styles/images/video.png" />
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
  import NavBar from '@/components/NavBar'
  import TabBar from '@/components/TabBar'
  import OldCard from '@/components/OldCard'

  export default {
    components: {
      NavBar,
      TabBar,
      OldCard
    }
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
