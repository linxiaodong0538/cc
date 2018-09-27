<template>
  <div>
    <NavBar :title="consts.ALIASES[where.alias] + ' - 老人详情'"></NavBar>
    <div class="main">
      <div :style="'width: 100%; height:' + imageHeight + 'px;'">
        <img v-if="details.picture" :src="helpers.getImageURL({ id: details.picture })"
             :style="'width: 100%; height:' + imageHeight + 'px;'" />
      </div>
      <Padding :dirs="['top']">
        <van-cell-group>
          <van-cell title="姓名" :value="details.name"></van-cell>
          <van-cell title="身份证" :value="details.id_card"></van-cell>
          <van-cell title="性别" :value="consts.GENDERS[details.gender]"></van-cell>
          <van-cell title="生日" :value="time.getDate(details.birthday)"></van-cell>
          <van-cell title="入院编号" :value="details.num"></van-cell>
          <van-cell v-if="myGuardian" title="监护人" is-link
                    @click="$router.push(`/families/families/details/${myGuardian.id}`)"></van-cell>
          <van-cell v-if="myFamilies.length > 1" title="家属" is-link @click="familiesVisible = true"></van-cell>
          <van-cell v-else title="家属" is-link
                    @click="$router.push(`/families/families/details/${myFamilies[0].id}`)"></van-cell>
          <van-cell title="护工" is-link
                    @click="myCarer.length && $router.push(`/staffs/carers/details/${myCarer[0].id}`)"></van-cell>
          <van-cell title="地址" :value="details.address"></van-cell>
          <van-cell title="既往病史" :value="details.medical_history"></van-cell>
          <van-cell title="入住时间" :value="details.stay_in_time"></van-cell>
          <van-cell title="入住房间" :value="details.stay_in_room"></van-cell>
          <van-cell title="护理等级" :value="details.nursing_grade"></van-cell>
          <van-cell title="托养费" :value="details.care_fee"></van-cell>
          <van-cell title="备用金" :value="details.petty_cash"></van-cell>
          <van-cell title="入院购置费" :value="details.purchase_cost"></van-cell>
          <van-cell title="加餐费" :value="details.extra_meal_fee"></van-cell>
          <van-cell title="特殊服务" :value="details.special_services"></van-cell>
          <van-cell title="过敏史" :value="details.allergic_history"></van-cell>
          <van-cell title="出院时间" :value="time.getDate(details.leave_hospital_time)"></van-cell>
          <van-cell title="出院原由" :value="details.leave_hospital_reason"></van-cell>
          <van-cell title="不良记录" :value="details.bad_record"></van-cell>
          <van-cell title="备注" :value="details.remark"></van-cell>
        </van-cell-group>
      </Padding>
    </div>
    <van-actionsheet
      v-model="familiesVisible"
      :actions="myFamilies.map(item => ({ id: item.id, name: item.name }))"
      @select="handleSelectFamily" />
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
      this.id && (this.formData.families = await this.getRelations('olds,families', this.id))
      this.id && (this.formData.carer = await this.getRelations('olds,carer', this.id))
      this.getFamilies()
      this.getCarers()
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
          active: 2
        },
        id: '',
        where: {},
        details: {},
        formData: {
          families: {},
          carer: {}
        },
        familiesVisible: false,
        myGuardian: {},
        myFamilies: [],
        carersVisible: false,
        myCarer: []
      }
    },
    computed: {
      ...mapState([
        'olds',
        'families',
        'staffs'
      ]),
      imageHeight () {
        return window.screen.width * 9 / 16
      }
    },
    methods: {
      getDetails (id) {
        return this.$store.dispatch('getOld', { id })
      },
      async getRelations (between, id) {
        const getRelationsRes = await this.$store.dispatch('getRelations', {
          query: {
            where: { between, resource1_id: id }
          }
        })

        return getRelationsRes.data.resource2_ids
      },
      async getFamilies () {
        return this.$store.dispatch('getFamilies', {
          query: { where: { alias: 'families' } }
        })
      },
      async getCarers () {
        return this.$store.dispatch('getStaffs', {
          query: { where: { alias: 'carers' } }
        })
      },
      handleSelectFamily (item) {
        this.$router.push(`/families/families/details/${item.id}`)
      }
    },
    watch: {
      'olds.old': {
        handler (newVal) {
          this.details = newVal
        }
      },
      'families.families': {
        handler (newVal) {
          const items = newVal.items || []
          this.myFamilies = this.formData.families.split(',').map(id => helpers.getItemById(items, id))
          this.myGuardian = this.myFamilies.find(item => item.is_guardian === 1)
        }
      },
      'staffs.staffs': {
        handler (newVal) {
          const items = newVal.items || []
          this.myCarer = this.formData.carer.split(',').map(id => helpers.getItemById(items, id))
        }
      }
    }
  }
</script>
