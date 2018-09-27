<template>
  <div>
    <NavBar :title="consts.ALIASES[where.alias] + ' - 维修保养记录 - 详情'" />
    <div class="main">
      <van-cell-group>
        <van-cell
          title="司机"
          :value="details.driver" />
        <van-cell
          title="故障时间"
          :value="time.getDate(details.time)" />
        <van-cell
          title="故障地点"
          :value="details.address" />
        <van-cell
          title="维修门店"
          :value="details.maintenance_store" />
        <van-cell
          title="维修费用"
          :value="details.maintenance_cost + ' 元'" />
        <van-cell
          title="是否开票"
          :value="details.has_receipt === '1' ? '是' : '否'" />
        <van-cell
          title="故障原因"
          :value="details.reason" />
      </van-cell-group>
    </div>
    <TabBar v-model="tabBar.active" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import consts from '@/utils/consts'
  import helpers from '@/utils/helpers/base'
  import time from '@/utils/time'
  import NavBar from '@/components/NavBar'
  import TabBar from '@/components/TabBar'
  import Padding from '@/components/Padding'

  export default {
    name: 'form',
    async created () {
      const { id, alias } = this.$route.params
      this.$set(this.where, 'alias', alias)
      this.id = id
      await this.getDetails(this.id)
    },
    components: {
      Padding,
      NavBar,
      TabBar
    },
    data () {
      return {
        consts,
        helpers,
        time,
        tabBar: {
          active: 1
        },
        id: '',
        where: {},
        details: {}
      }
    },
    computed: {
      ...mapState([
        'carBreakdowns'
      ]),
      imageHeight () {
        return window.screen.width * 9 / 16
      }
    },
    methods: {
      getDetails (id) {
        return this.$store.dispatch('getCarBreakdown', { id })
      }
    },
    watch: {
      'carBreakdowns.carBreakdown': {
        handler (newVal) {
          this.details = newVal
        }
      }
    }
  }
</script>
