<template>
  <div>
    <NavBar
      title="意见反馈"
      back />
    <div class="p-my-feedback o-box has-nav-bar">
      <div class="c-textarea-wrap">
        <textarea
          class="c-textarea fs4"
          placeholder="输入您的意见或建议"
          v-model="formData.content">
        </textarea>
        <Padding
          size="lg"
          :dirs="[ 'left', 'right' ]">
          <div
            class="c-button c-button--1 c1 fs6"
            @click="handleSubmit">
            提交
          </div>
        </Padding>
      </div>
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
    data () {
      return {
        formData: {
          feedback: ''
        }
      }
    },
    methods: {
      handleSubmit () {
        if (!this.formData.content) {
          this.$toast('内容不能为空')
          return
        }
        this.$toast('提交成功')
      }
    }
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
