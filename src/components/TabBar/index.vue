<template>
  <div class="c-tab-bar">
    <div
      class="c-tab-bar__item c5 fs5"
      @click.stop="toggleDropVisible">
      <div class="c-icon c-icon--extend"></div>
      赵老人
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
      class="c-tab-bar__item c5 fs5"
      @click="$router.push('/my/home')">
      我的
    </div>
    <div
      v-show="cDrop.visible"
      class="cc-drop fs5">
      <div
        class="cc-drop__item is-first"
        :class="{ 'is-active': cDrop.current === 0 }"
        @click="handleSelectDrop(0)">
        赵老人
      </div>
      <div
        class="cc-drop__item"
        :class="{ 'is-active': cDrop.current === 1}"
        @click="handleSelectDrop(1)">
        陈老人
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
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
    mounted () {
      document.getElementById('app').addEventListener('click', () => {
        this.cDrop.visible = false
      })
    }
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
