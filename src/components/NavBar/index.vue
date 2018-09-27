<template>
  <van-nav-bar
    :title="title"
    left-arrow
    @click-left="handleClickLeft"
    @click-right="handleClickRight">
    <van-icon v-if="helpers.isAccessible([
      consts.PERMISSIONS.MANAGE_MEDICINES,
      consts.PERMISSIONS.MANAGE_FOODS,
      consts.PERMISSIONS.MANAGE_SUPPLIES
    ])" name="qr" slot="right" />
  </van-nav-bar>
</template>

<script>
  import consts from '@/utils/consts'
  import helpers from '@/utils/helpers/base'

  export default {
    name: 'nav-bar',
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        consts,
        helpers
      }
    },
    methods: {
      handleClickLeft () {
        window.history.go(-1)
      },
      handleClickRight () {
        window.api.require('FNScanner').open({
          autorotation: true
        }, (ret, err) => {
          if (ret.eventType === 'success') {
            const data = JSON.parse(ret.content)
            this.$router.push(`/${data.model}/${data.alias}/details/${data.id}`)
          }
        })
      }
    }
  }
</script>
