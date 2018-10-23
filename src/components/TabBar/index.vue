<template>
  <div
    class="c-tab-bar"
    :class="{ 'is-active': isHome }">
    <div
      v-if="true"
      class="c-tab-bar__item fs5"
      :class="{ 'is-active': isHome }"
      @click="$router.push('/olds')">
      陈爸爸
    </div>
    <div
      v-else
      class="c-tab-bar__item fs5"
      :class="{ 'is-active': isHome }"
      @click.stop="toggleDropVisible">
      <div
        class="c-icon c-icon--extend"
        :class="{ 'is-active': isHome }">
      </div>
      陈爸爸
    </div>
    <div
      class="c-tab-bar__item"
      @click="$router.push('/')">
      <div class="c-tab-bar__middle c1 fs3">
        <div class="c-tab-bar__middle-text">
          重阳<br />画映
        </div>
      </div>
    </div>
    <div
      class="c-tab-bar__item fs5"
      :class="{ 'is-active': isHome }"
      @click="$router.push('/my/home')">
      我的
    </div>
    <div
      v-show="cDrop.visible"
      id="overlay"
      class="c-overlay">
    </div>
    <div
      v-show="cDrop.visible"
      class="cc-drop fs5">
      <div
        class="cc-drop__item is-first"
        :class="{ 'is-active': cDrop.current === 0 }"
        @click="handleSelectDrop(0)">
        陈爸爸
      </div>
      <div
        class="cc-drop__item"
        :class="{ 'is-active': cDrop.current === 1}"
        @click="handleSelectDrop(1)">
        陈妈妈
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isHome: true,
        cDrop: {
          visible: false,
          current: 0
        }
      }
    },
    methods: {
      toggleDropVisible () {
        this.cDrop.visible = !this.cDrop.visible
      },
      handleSelectDrop (index) {
        this.cDrop.current = index
        this.cDrop.visible = false
        this.$router.push('/olds/trends')
      }
    },
    created () {
      this.isHome = this.$route.path === '/'
    },
    mounted () {
      document.getElementById('app').addEventListener('click', () => {
        this.cDrop.visible = false
      })
    }
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
