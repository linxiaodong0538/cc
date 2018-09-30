<template>
  <div>
    <div class="p-home o-box has-tab-bar">
      <div class="pb-demo">
        <div class="pb-button pb-button--praise">
          <div class="pb-button__num c4 fs2">88</div>
          <div class="pb-button__text c1 fs2">点赞</div>
        </div>
        <div class="pb-button pb-button--comment">
          <div class="pb-button__num c4 fs2">88</div>
          <div class="pb-button__text c1 fs2">评论</div>
        </div>
        <div class="pb-title c1 fs10">世界上最美的十大海岛排行榜，带您领略惊世之美</div>
        <div class="pb-address c1 fs2">福州 · 闽侯重阳养老院</div>
        <div class="pb-time c1 fs2">2018年09月19日</div>
      </div>
    </div>
    <TabBar />
  </div>
</template>

<script>
  import TabBar from '@/components/TabBar'

  export default {
    components: {
      TabBar
    }
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
