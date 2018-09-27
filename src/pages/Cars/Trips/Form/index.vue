<template>
  <div>
    <NavBar :title="consts.ALIASES[where.alias] + ' - 提交行程'"></NavBar>
    <div class="main">
      <van-cell-group>
        <van-field
          v-model="formValidate.driver"
          label="司机"
          placeholder="请输入司机"
          required
          clearable>
          <van-button slot="button" size="small" @click="handleGetCheckCode" style="display: none;">
            选择
          </van-button>
        </van-field>
        <van-field
          :value="time.getTime(formValidate.start_time)"
          label="开始时间"
          placeholder="请选择开始时间"
          required
          clearable
          readonly
          @focus="startTimeVisible = true" />
        <van-field
          v-model="formValidate.start_km"
          label="开始公里数"
          placeholder="请输入开始公里数"
          required
          clearable />
        <van-field
          :value="time.getTime(formValidate.end_time)"
          label="结束时间"
          placeholder="请选择结束时间"
          required
          clearable
          readonly
          @focus="endTimeVisible = true" />
        <van-field
          v-model="formValidate.end_km"
          label="结束公里数"
          placeholder="请输入结束公里数"
          required
          clearable />
        <van-field
          v-model="formValidate.stop1"
          label="停靠点"
          placeholder="请输入停靠点"
          clearable />
        <van-field
          v-model="formValidate.stop2"
          label="停靠点"
          placeholder="请输入停靠点"
          clearable />
        <van-field
          v-model="formValidate.stop3"
          label="停靠点"
          placeholder="请输入停靠点"
          clearable />
        <van-field
          v-model="formValidate.destination"
          label="目的地"
          placeholder="请输入目的地"
          required
          clearable />
        <van-field
          type="textarea"
          rows="3"
          v-model="formValidate.aim"
          label="行程目的"
          placeholder="请输入行程目的"
          required
          clearable />
      </van-cell-group>
      <Padding>
        <van-button type="primary" size="large" @click="handleConfirm">提交</van-button>
      </Padding>
      <van-popup v-model="startTimeVisible" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="formValidate.start_time"
          type="datetime"
          @confirm="startTimeVisible = false" />
      </van-popup>
      <van-popup v-model="endTimeVisible" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="formValidate.end_time"
          type="datetime"
          @confirm="endTimeVisible = false" />
      </van-popup>
    </div>
    <TabBar v-model="tabBar.active"></TabBar>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import consts from '@/utils/consts'
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
      const now = new Date()
      this.formValidate.start_time = now
      this.formValidate.end_time = now
    },
    components: {
      Padding,
      NavBar,
      TabBar
    },
    data () {
      return {
        consts,
        time,
        tabBar: {
          active: 1
        },
        id: '',
        where: {},
        formValidate: {},
        details: {},
        startTimeVisible: false,
        endTimeVisible: false
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
        return this.$store.dispatch('getCarTrip', { id })
      },
      handleImageRead (file) {
        console.log(file)
      },
      async handleConfirm () {
        const { driver, start_km, end_km, destination, aim } = this.formValidate

        if (!driver) {
          this.$toast('司机不能为空')
          return
        }

        if (!start_km) {
          this.$toast('开始公里数不能为空')
          return
        }

        if (!end_km) {
          this.$toast('结束公里数不能为空')
          return
        }

        if (!destination) {
          this.$toast('目的地不能为空')
          return
        }

        if (!aim) {
          this.$toast('行程目的不能为空')
          return
        }

        const startTime = time.getTime(this.formValidate.start_time)
        const endTime = time.getTime(this.formValidate.end_time)

        await this.$store.dispatch('postCarTrip', {
          body: {
            ...this.formValidate,
            start_date: startTime.split(' ')[0],
            start_time: startTime.split(' ')[1],
            end_date: endTime.split(' ')[0],
            end_time: endTime.split(' ')[1],
            car_id: this.$route.params.carId,
            alias: this.where.alias
          }
        })

        this.$toast('提交成功')

        window.history.go(-1)
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
