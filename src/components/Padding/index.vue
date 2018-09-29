<template>
  <div class="c-padding" :class="[size, ...dirs]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'padding',
    props: {
      size: {
        type: String,
        default: 'md'
      },
      dirs: {
        type: Array,
        default () {
          return ['top', 'bottom', 'left', 'right']
        }
      }
    }
  }
</script>

<style lang="scss" scoped src="./styles/index.scss"></style>
