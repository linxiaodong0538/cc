<template>
  <div>
    <NavBar title="我的" />
    <div class="p-my-home o-box has-nav-bar has-tab-bar">
      <div class="pb-name fs10">
        赵儿子
        <div class="pb-name__relation c8 fs6">父子关系</div>
      </div>
      <ul class="c-list fs8">
        <li
          class="c-list__item"
          @click="$router.push('/my/messages')">
          我的消息
        </li>
        <li
          class="c-list__item"
          @click="$router.push('/my/comments')">
          我的评论
        </li>
        <li class="c-list__item">意见反馈</li>
        <li class="c-list__item">联系我们</li>
      </ul>
      <div
        class="pb-button c-button c-button--2 c5 bd-c5 fs6"
        @click="handleLogin">
        切换账号
      </div>
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
