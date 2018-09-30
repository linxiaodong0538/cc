<template>
  <div class="c-nav-bar">
    <div
      v-if="back"
      class="c-nav-bar__back"
      @click="handleBack">
    </div>
    <div class="c-nav-bar__title c1 fs9">{{ title }}</div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
    props: {
      title: {
        type: String,
        default: ''
      },
      back: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleBack () {
        window.history.go(-1)
      }
    }
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
