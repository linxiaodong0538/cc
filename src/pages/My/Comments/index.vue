<template>
  <div>
    <NavBar
      title="我的评论"
      back />
    <div class="p-my-comments o-box has-nav-bar">

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
