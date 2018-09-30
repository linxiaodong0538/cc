<template>
  <div>
    <NavBar title="健康动态" />
    <div class="p-olds-trends o-box has-nav-bar has-tab-bar">
      <div class="pb-card__wrap">
        <div class="pb-card">
          <img
            class="pb-card__image"
            src="./styles/images/avatar.png" />
          <div class="pb-card__body">
            <div class="pb-card__name fs12">程江杰</div>
            <div class="pb-card__info fs3">
              <span class="c3">入院号：</span>
              <span>89877666</span>
              <span
                class="c3"
                style="padding-left: 0.88rem;">房间号：</span>
              <span>298</span>
            </div>
          </div>
        </div>
      </div>
      <ul class="c-tabs fs4">
        <li class="c-tabs__item is-active">
          <span>健康动态</span>
        </li>
        <li class="c-tabs__item">
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

  export default {
    components: {
      NavBar,
      TabBar
    }
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
