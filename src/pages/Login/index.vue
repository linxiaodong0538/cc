<template>
  <div class="full-page">
    <van-nav-bar title="登入" />
    <div class="login">
      <van-cell-group>
        <van-field
          v-model="formValidate.org"
          type="tel"
          label="机构"
          placeholder="请选择机构"
          required
          readonly
          @focus="org.modal = true"
        />
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
          label="密码"
          placeholder="请输入密码"
          required
          clearable
        />
        <van-cell title="忘记密码" is-link @click="$router.push('/password')" />
      </van-cell-group>
      <Padding>
        <van-button type="primary" size="large" @click="handleLogin">登入</van-button>
      </Padding>
    </div>
    <van-actionsheet
      v-model="org.modal"
      :actions="org.actions"
      @select="handleSelectOrg" />
  </div>
</template>

<script>
  import auth from '@/utils/auth'
  import helpers from '@/utils/helpers/base'
  import Padding from '@/components/Padding'

  export default {
    name: 'login',
    components: {
      Padding
    },
    data () {
      return {
        org: {
          modal: false,
          actions: [
            {
              name: '闽侯重阳养老院',
              value: 1
            },
            {
              name: '鼓山下院老人公寓',
              value: 2
            },
            {
              name: '福州市鼓楼区天年老人护理中心',
              value: 3
            },
            {
              name: '闽侯县玖玖养老院管理有限公司',
              value: 4
            },
            {
              name: '福州玖玖养老护理院',
              value: 5
            },
            {
              name: '福州市金秋老人院',
              value: 6
            },
            {
              name: '福州天年老人护理中心',
              value: 7
            }
          ]
        },
        formValidate: {
          org: ''
        }
      }
    },
    methods: {
      handleSelectOrg (e) {
        this.formValidate.org = e.name
        this.org.modal = false
      },
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

        auth.login(postStaffActionRes.data)

        this.$toast('登入成功')

        this.$router.push(helpers.getDefaultPage())
      }
    }
  }
</script>

<style lang="scss" scoped src="./styles/index.scss">
</style>
