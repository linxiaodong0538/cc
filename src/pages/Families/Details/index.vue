<template>
  <div>
    <NavBar :title="consts.ALIASES[where.alias] + ' - 家属详情'"></NavBar>
    <div class="main">
      <div :style="'width: 100%; height:' + imageHeight + 'px;'">
        <img v-if="details.picture" :src="helpers.getImageURL({ id: details.picture })"
             :style="'width: 100%; height:' + imageHeight + 'px;'" />
      </div>
      <Padding :dirs="['top']">
        <van-cell-group>
          <van-cell title="姓名" :value="details.name + (details.is_guardian ? '（监护人）' : '')"></van-cell>
          <van-cell title="身份证" :value="details.id_card"></van-cell>
          <van-cell title="性别" :value="consts.GENDERS[details.gender]"></van-cell>
          <van-cell title="生日" :value="time.getDate(details.birthday)"></van-cell>
          <van-cell v-if="myOlds.length > 1" title="老人入院编号" is-link @click="oldsVisible = true"></van-cell>
          <van-cell v-else title="老人入院编号" is-link
                    @click="$router.push(`/olds/${where.alias}/details/${myOlds[0].id}`)"></van-cell>
          <van-cell title="住址" :value="details.address"></van-cell>
          <van-cell title="联系电话" :value="details.telephone"></van-cell>
          <van-cell title="单位" :value="details.company"></van-cell>
          <van-cell title="职位" :value="details.job"></van-cell>
          <van-cell title="与老人关系" :value="details.relation"></van-cell>
          <van-cell title="不良记录" :value="details.bad_record"></van-cell>
          <van-cell title="备注" :value="details.remark"></van-cell>
        </van-cell-group>
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
    async created () {
      const { id, alias } = this.$route.params
      this.$set(this.where, 'alias', alias)
      this.id = id
      await this.getDetails(this.id)
      this.id && this.$set(this.formData, 'olds', await this.getRelations('olds,families', this.id))
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
        tabBar: {
          active: 2
        },
        id: '',
        where: {},
        details: {},
        myOlds: [],
        oldsVisible: false,
        formData: {}
      }
    },
    computed: {
      ...mapState([
        'families',
        'olds'
      ]),
      imageHeight () {
        return window.screen.width * 9 / 16
      }
    },
    methods: {
      getDetails (id) {
        return this.$store.dispatch('getFamily', { id })
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
      handleSelectOld (item) {
        this.$router.push(`/olds/${this.where.alias}/details/${item.id}`)
      }
    },
    watch: {
      'families.family': {
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
