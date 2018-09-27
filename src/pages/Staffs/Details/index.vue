<template>
  <div>{{ whose }}
    <NavBar :title="whose === 'my' ? '我' : consts.ALIASES[where.alias] + ' - 员工详情'"></NavBar>
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
          <van-cell v-if="where.alias === 'carers' && myOlds.length > 1" title="老人入院编号" is-link
                    @click="oldsVisible = true"></van-cell>
          <van-cell v-if="where.alias === 'carers' &&myOlds.length === 1" title="老人入院编号" is-link
                    @click="$router.push(`/olds/olds/details/${myOlds[0].id}`)"></van-cell>
          <van-cell title="文化程度" :value="details.education_degree"></van-cell>
          <van-cell title="从业资格证" :value="details.qualification_certificate"></van-cell>
          <van-cell title="在职岗位" :value="details.job"></van-cell>
          <van-cell title="本人电话" :value="details.telephone"></van-cell>
          <van-cell title="亲属电话" :value="details.family_telephone"></van-cell>
          <van-cell title="从业经历" :value="details.employment_experience"></van-cell>
          <van-cell title="上岗时间" :value="time.getDate(details.start_time)"></van-cell>
          <van-cell title="离岗时间" :value="time.getDate(details.release_time)"></van-cell>
          <van-cell title="薪资待遇" :value="details.salary + ' 元/月'"></van-cell>
          <van-cell title="请假" :value="details.leave"></van-cell>
          <van-cell title="补贴" :value="details.subsidy"></van-cell>
          <van-cell v-if="where.alias === 'carers'" title="籍贯" :value="details.native_place"></van-cell>
          <van-cell v-if="where.alias === 'carers'" title="工龄" :value="details.seniority"></van-cell>
          <van-cell v-if="where.alias === 'carers'" title="负责房间" :value="details.room"></van-cell>
          <van-cell title="备注" :value="details.remark"></van-cell>
        </van-cell-group>
        <Padding v-if="whose === 'my'">
          <van-button type="primary" size="large" @click="handleLogout">切换账号</van-button>
        </Padding>
      </Padding>
    </div>
    <van-actionsheet
      v-model="oldsVisible"
      :actions="myOlds.map(item => ({ id: item.id, name: `${item.num}（${item.name}）` }))"
      @select="handleSelectOld" />
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
    async beforeRouteUpdate (to, from, next) {
      this.staffs.staff = {}
      const { id, alias, whose } = to.params
      this.id = id
      this.whose = whose
      if (whose === 'my') {
        this.tabBar.active = 4
      }
      this.$set(this.where, 'alias', alias)
      await this.getDetails(this.id)
      next()
    },
    async created () {
      this.staffs.staff = {}
      const { id, alias, whose } = this.$route.params
      this.id = id
      this.whose = whose
      if (whose === 'my') {
        this.tabBar.active = 4
      }
      this.$set(this.where, 'alias', alias)
      await this.getDetails(this.id)
      this.id && this.$set(this.formData, 'olds', await this.getRelations('olds,carer', this.id))
      this.getOlds()
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
        myOlds: [],
        formData: {},
        tabBar: {
          active: 2
        },
        id: '',
        where: {},
        whose: '',
        details: {},
        oldsVisible: false
      }
    },
    computed: {
      ...mapState([
        'staffs',
        'olds',
        'relations'
      ]),
      imageHeight () {
        return window.screen.width * 9 / 16
      }
    },
    methods: {
      getDetails (id) {
        return this.$store.dispatch('getStaff', { id })
      },
      async getRelations (between, id) {
        const getRelationsRes = await this.$store.dispatch('getRelations', {
          query: {
            where: { between, resource2_id: id }
          }
        })

        return getRelationsRes.data.resource1_ids
      },
      async getOlds () {
        return this.$store.dispatch('getOlds', {
          query: { where: { alias: 'olds' } }
        })
      },
      async handleLogout () {
        await this.$dialog.confirm({
          title: '请确认',
          message: '是否确认切换账号？'
        })

        this.$router.push('/logout')
      },
      handleSelectOld (item) {
        this.$router.push(`/olds/olds/details/${item.id}`)
      }
    },
    watch: {
      'staffs.staff': {
        handler (newVal) {
          this.details = newVal
        }
      },
      'olds.olds': {
        handler (newVal) {
          const items = newVal.items || []
          this.myOlds = this.formData.olds.split(',').map(id => helpers.getItemById(items, id))
        }
      }
    }
  }
</script>
