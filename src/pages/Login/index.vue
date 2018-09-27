<template>
  <div class="p-login">
    <div class="pb-logo"></div>
    <Padding
      size="lg"
      :dirs="[ 'left', 'right' ]">
      <input
        class="c-input fs6"
        type="text"
        placeholder="请输入手机号" />
      <input
        class="c-input fs6"
        type="text"
        placeholder="请输入密码" />
      <span class="pb-forget-password c5 fs4">忘记密码</span>
      <div class="pb-button c-button c-button--1 c1 fs6">登入</div>
    </Padding>
  </div>
</template>

<script>
  import Padding from '@/components/Padding'

  export default {
    name: 'login',
    components: {
      Padding
    },
    data () {
      return {
        formValidate: {}
      }
    },
    methods: {
      async handleLogin () {
        const { org, telephone, password } = this.formValidate

        if (!org) {
          this.$toast('机构不能为空')
          return
        }

        if (!telephone) {
          this.$toast('手机号不能为空')
          return
        }

        if (!password) {
          this.$toast('密码不能为空')
          return
        }

        if (org !== '闽侯重阳养老院') {
          this.$toast('该机构下不存在此手机号')
          return
        }

        const postStaffActionRes = await this.$store.dispatch('postStaffAction', {
          body: {
            type: 'LOGIN',
            telephone,
            password
          }
        })

        this.auth.login(postStaffActionRes.data)

        this.$toast('登入成功')

        // this.$router.push(helpers.getDefaultPage())
      }
    }
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
