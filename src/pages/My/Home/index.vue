<template>
  <div class="p-my-home">
    <NavBar title="我的" />
    <div class="pb-name fs10">
      赵儿子
      <div class="pb-name__relation c8 fs6">父子关系</div>
    </div>
    <><>
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
