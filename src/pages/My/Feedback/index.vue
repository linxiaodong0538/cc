<template>
  <div>
    <NavBar
      title="意见反馈"
      back />
    <div class="p-my-feedback o-box has-nav-bar">
      <textarea
        class="pb-textarea fs4"
        placeholder="输入您的意见或建议">
      </textarea>
      <Padding
        size="lg"
        :dirs="[ 'left', 'right' ]">
        <div
          class="pb-button c-button c-button--1 c1 fs6"
          @click="handleSubmit">
          提交
        </div>
      </Padding>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  import TabBar from '@/components/TabBar'
  import Padding from '@/components/Padding'

  export default {
    components: {
      NavBar,
      TabBar,
      Padding
    },
    methods: {
      handleSubmit () {}
    }
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
