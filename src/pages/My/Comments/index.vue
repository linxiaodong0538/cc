<template>
  <div>
    <NavBar
      title="我的评论"
      back />
    <div class="p-my-comments o-box has-nav-bar">
      <ul class="c-comment-list">
        <li class="c-comment-list__item">
          <img
            class="c-comment-list__avatar"
            src="./styles/images/logo.png" />
          <div class="c-comment-list__body">
            <div class="c-comment-list__title fs4">
              <span class="c9">重阳机器人</span>
              回复了您
            </div>
            <div class="c-comment-list__content fs6">
              这个视频非常好玩，以后我们会都拍摄这种的。
            </div>
            <div class="c-comment-list__time c3 fs4">2018-10-03 15:00:11</div>
          </div>
          <img
            class="c-comment-list__preview"
            src="./styles/images/preview.png" />
        </li>
        <li class="c-comment-list__item">
          <img
            class="c-comment-list__avatar"
            src="./styles/images/logo.png" />
          <div class="c-comment-list__body">
            <div class="c-comment-list__title fs4">
              <span class="c9">重阳机器人</span>
              回复了您
            </div>
            <div class="c-comment-list__content fs6">
              这个视频非常好玩，以后我们会都拍摄这种的。
            </div>
            <div class="c-comment-list__time c3 fs4">2018-10-03 15:00:11</div>
          </div>
          <img
            class="c-comment-list__preview"
            src="./styles/images/preview.png" />
        </li>
      </ul>
    </div>
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
