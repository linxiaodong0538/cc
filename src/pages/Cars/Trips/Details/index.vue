<template>
  <div>
    <NavBar :title="consts.ALIASES[where.alias] + ' - 行程记录 - 详情'"></NavBar>
    <div class="main">
      <van-cell-group>
        <van-cell title="司机" :value="details.driver"></van-cell>
        <van-cell title="开始时间" :value="time.getDate(details.start_date) + ' ' + details.start_time"></van-cell>
        <van-cell title="开始公里数" :value="details.start_km + ' 公里'"></van-cell>
        <van-cell title="结束时间" :value="time.getDate(details.end_date) + ' ' + details.start_time"></van-cell>
        <van-cell title="结束公里数" :value="details.end_km + ' 公里'"></van-cell>
        <van-cell v-if="details.stop1" title="停靠点" :value="details.stop1"></van-cell>
        <van-cell v-if="details.stop2" title="停靠点" :value="details.stop2"></van-cell>
        <van-cell v-if="details.stop3" title="停靠点" :value="details.stop3"></van-cell>
        <van-cell title="目的地" :value="details.destination"></van-cell>
        <van-cell title="行程目的" :value="details.aim"></van-cell>
      </van-cell-group>
    </div>
    <TabBar v-model="tabBar.active"></TabBar>
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
        'carTrips'
      ]),
      imageHeight () {
        return window.screen.width * 9 / 16
      }
    },
    methods: {
      getDetails (id) {
        return this.$store.dispatch('getCarTrip', { id })
      }
    },
    watch: {
      'carTrips.carTrip': {
        handler (newVal) {
          this.details = newVal
        }
      }
    }
  }
</script>
