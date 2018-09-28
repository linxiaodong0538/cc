<template>
  <div class="p-password">
    <NavBar title="忘记密码" />
    <Padding
      size="lg"
      :dirs="[ 'left', 'right' ]">
      <input
        class="c-input fs6"
        type="text"
        placeholder="请输入手机号"
        v-modal="formValidate.telephone" />
      <input
        class="c-input fs6"
        type="password"
        placeholder="请输入密码"
        v-modal="formValidate.password" />
      <input
        class="c-input fs6"
        type="text"
        placeholder="请输入密码"
        v-modal="formValidate.password" />
      <div
        class="pb-button c-button c-button--1 c1 fs6"
        @click="handleLogin">
        确认修改
      </div>
    </Padding>
    <TabBar />
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  import Padding from '@/components/Padding'
  import TabBar from '@/components/TabBar'

  export default {
    name: 'login',
    components: {
      NavBar,
      Padding,
      TabBar
    },
    data () {
      return {
        formValidate: {},
        checkCode: {
          tip: '获取短信验证码',
          got: false
        }
      }
    },
    methods: {
      async getCheckCode (telephone) {
        const postStaffActionRes = await this.$store.dispatch('postStaffAction', {
          body: {
            type: 'GET_CHECK_CODE',
            telephone
          }
        })

        return postStaffActionRes.data.check_code
      },
      async handleGetCheckCode () {
        if (this.checkCode.got) {
          return
        }

        const { telephone } = this.formValidate

        if (!telephone) {
          this.$toast('手机号不能为空')
          return
        }

        await this.getCheckCode(telephone)

        const TOTAL_SECONDS = 60
        let i = 0

        this.checkCode.got = true
        this.checkCode.tip = `${TOTAL_SECONDS} 秒后重新获取`

        this.checkCodeTimer = setInterval(() => {
          this.checkCode.tip = `${TOTAL_SECONDS - ++i} 秒后重新获取`

          if (TOTAL_SECONDS === i) {
            clearInterval(this.checkCodeTimer)

            this.checkCode.got = false
            this.checkCode.tip = '获取短信验证码'
          }
        }, 1000)
      },
      async handleConfirm () {
        const { telephone, password, check_code } = this.formValidate

        if (!telephone) {
          this.$toast('手机号不能为空')
          return
        }

        if (!password) {
          this.$toast('新密码不能为空')
          return
        }

        if (password.length < 6) {
          this.$toast('新密码不能小于 6 位')
          return
        }

        if (!check_code) {
          this.$toast('短信验证码不能为空')
          return
        }

        await this.$store.dispatch('postStaffAction', {
          body: {
            type: 'UPDATE_PASSWORD',
            telephone,
            password,
            check_code
          }
        })

        this.$toast('密码修改成功')

        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss" scoped src="./styles/index.scss">
</style>
