<template>
  <div>
    <NavBar title="我的" />
    <div class="p-my-home o-box has-nav-bar has-tab-bar">
      <div class="pb-name fs10">
        赵儿子
        <div class="pb-name__relation c8 fs6">父子关系</div>
      </div>
      abcd
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
