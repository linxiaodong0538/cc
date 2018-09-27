<template>
  <div>
    <NavBar :title="consts.ALIASES[where.alias] + ' - 提交维修保养'"></NavBar>
    <div class="main">
      <van-cell-group>
        <van-field
          v-model="formValidate.driver"
          label="司机"
          placeholder="请输入司机"
          required
          clearable />
        <van-field
          :value="time.getDate(formValidate.time)"
          label="故障时间"
          placeholder="请选择故障时间"
          required
          clearable
          readonly
          @focus="timeVisible = true" />
        <van-field
          v-model="formValidate.address"
          label="故障地点"
          placeholder="请输入故障地点"
          required
          clearable />
        <van-field
          v-model="formValidate.maintenance_store"
          label="维修门店"
          placeholder="请输入维修门店"
          clearable />
        <van-field
          v-model="formValidate.maintenance_cost"
          label="维修费用"
          placeholder="请输入维修费用"
          required
          clearable />
        <van-field
          :value="formValidate.has_receipt === 0 ? '否' : '是'"
          label="是否开票"
          readonly
          @focus="hasReceiptVisible = true" />
        <van-field
          type="textarea"
          rows="3"
          v-model="formValidate.reason"
          label="故障原因"
          placeholder="请输入故障原因"
          required
          clearable />
      </van-cell-group>
      <!--
      <div class="title">备案图片</div>
      <Padding>
        <van-uploader :after-read="handleImageRead">
          <van-icon name="photograph" />
        </van-uploader>
      </Padding>
      -->
      <Padding>
        <van-button type="primary" size="large" @click="handleConfirm">提交</van-button>
      </Padding>
      <van-popup v-model="timeVisible" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="formValidate.time"
          type="date"
          @confirm="timeVisible = false" />
      </van-popup>
      <van-popup v-model="hasReceiptVisible" position="bottom" :overlay="true">
        <van-picker
          title="标题"
          :columns="['否', '是']"
          @change="handleReceiptChange"
        />
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
      this.$set(this.formValidate, 'time', new Date())
      this.$set(this.formValidate, 'has_receipt', 0)
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
        timeVisible: false,
        hasReceiptVisible: false
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
      },
      handleImageRead (file) {
        console.log(file)
      },
      async handleConfirm () {
        const { driver, address, maintenance_cost, reason } = this.formValidate

        if (!driver) {
          this.$toast('司机不能为空')
          return
        }

        if (!address) {
          this.$toast('故障地点不能为空')
          return
        }

        if (!maintenance_cost) {
          this.$toast('维修费用不能为空')
          return
        }

        if (!reason) {
          this.$toast('故障原因不能为空')
          return
        }

        await this.$store.dispatch('postCarBreakdown', {
          body: {
            ...this.formValidate,
            car_id: this.$route.params.carId,
            alias: this.where.alias
          }
        })

        this.$toast('提交成功')

        window.history.go(-1)
      },
      handleReceiptChange (picker, value, index) {
        this.formValidate.has_receipt = index
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
