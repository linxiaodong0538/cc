<template>
  <div>
    <NavBar :title="consts.ALIASES[where.alias] + ' - 详情'"></NavBar>
    <div class="main">
      <div :style="'width: 100%; height:' + imageHeight + 'px;'">
        <img v-if="details.picture" :src="helpers.getImageURL({ id: details.picture })"
             :style="'width: 100%; height:' + imageHeight + 'px;'" />
      </div>
      <Padding>
        <van-row gutter="15">
          <van-col span="12">
            <van-button size="normal" block @click="$router.push(`/cars/${where.alias}/breakdowns/form/${details.id}`)">
              提交维修保养
            </van-button>
          </van-col>
          <van-col span="12">
            <van-button size="normal" block @click="$router.push(`/cars/${where.alias}/trips/form/${details.id}`)">
              提交行程
            </van-button>
          </van-col>
        </van-row>
      </Padding>
      <van-cell-group>
        <van-cell title="车牌号" :value="details.num"></van-cell>
        <van-cell title="车主" :value="details.owner"></van-cell>
        <van-cell title="车检时间" :value="time.getDate(details.mot_time)"></van-cell>
        <van-cell title="保险到期时间" :value="time.getDate(details.insurance_time)"></van-cell>
        <van-cell title="购买日期" :value="time.getDate(details.buy_time)"></van-cell>
        <van-cell title="维修保养记录" is-link @click="$router.push(`/cars/${where.alias}/breakdowns/list/${details.id}`)"></van-cell>
        <van-cell title="行程记录" is-link @click="$router.push(`/cars/${where.alias}/trips/list/${details.id}`)"></van-cell>
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
        'cars'
      ]),
      imageHeight () {
        return window.screen.width * 9 / 16
      }
    },
    methods: {
      getDetails (id) {
        return this.$store.dispatch('getCar', { id })
      }
    },
    watch: {
      'cars.car': {
        handler (newVal) {
          this.details = newVal
        }
      }
    }
  }
</script>
