<template>
  <div class="full-page">
    <van-nav-bar title="忘记密码" left-arrow @click-left="$router.push('/login')" />
    <div class="password">
      <van-cell-group>
        <van-field
          v-model="formValidate.telephone"
          type="tel"
          label="账号"
          placeholder="请输入手机号"
          required
          clearable
        />
        <van-field
          v-model="formValidate.password"
          type="password"
          label="新密码"
          placeholder="请输入新密码"
          required
          clearable
        />
        <van-field
          v-model="formValidate.check_code"
          label="短信验证码"
          placeholder="请输入短信验证码"
          required
          clearable
        >
          <van-button slot="button" size="small" :disabled="checkCode.got"
                      @click="handleGetCheckCode">
            {{ checkCode.tip }}
          </van-button>
        </van-field>
      </van-cell-group>
      <Padding>
        <van-button type="primary" size="large" @click="handleConfirm">确认修改</van-button>
      </Padding>
    </div>
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
