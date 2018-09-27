<template>
  <div class="full-page">
    full page
  </div>
</template>

<script>
  export default {
    name: 'login',
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

        this.$router.push(helpers.getDefaultPage())
      }
    }
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
