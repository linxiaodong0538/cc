<template>
  <div>
    <van-tabbar :value="value" @click="handleClickTab">
      <van-tabbar-item
        v-show="helpers.isAccessible([
          consts.PERMISSIONS.MANAGE_MEDICINES,
          consts.PERMISSIONS.MANAGE_FOODS,
          consts.PERMISSIONS.MANAGE_SUPPLIES
        ])"
        icon="shop" @click="handleClickTab('storehouse')">仓库
      </van-tabbar-item>
      <van-tabbar-item
        v-show="helpers.isAccessible([
          consts.PERMISSIONS.MANAGE_CARS
        ])"
        icon="logistics" @click="handleClickTab('cars')">车辆
      </van-tabbar-item>
      <van-tabbar-item
        v-show="helpers.isAccessible([
          consts.PERMISSIONS.MANAGE_STAFFS,
          consts.PERMISSIONS.MANAGE_OLDS,
          consts.PERMISSIONS.MANAGE_CARERS,
          consts.PERMISSIONS.MANAGE_FAMILIES
        ])"
        icon="records" @click="handleClickTab('persons')">人员
      </van-tabbar-item>
      <van-tabbar-item
        v-show="helpers.isAccessible([
          consts.PERMISSIONS.MANAGE_CARS,
          consts.PERMISSIONS.MANAGE_MEDICINES,
          consts.PERMISSIONS.MANAGE_FOODS,
          consts.PERMISSIONS.MANAGE_SUPPLIES
        ])"
        icon="info-o" @click="handleClickTab('notices')">告警
      </van-tabbar-item>
      <van-tabbar-item icon="contact" @click="handleClickTab('my')">我</van-tabbar-item>
    </van-tabbar>
    <van-actionsheet
      v-model="storehouse.visible"
      :actions="storehouse.actions"
      @select="handleSelectStorehouse" />
    <van-actionsheet
      v-model="persons.visible"
      :actions="persons.actions"
      @select="handleSelectPersons" />
    <van-actionsheet
      v-model="notices.visible"
      :actions="notices.actions"
      @select="handleSelectNotices" />
  </div>
</template>

<script>
  import auth from '@/utils/auth'
  import consts from '@/utils/consts'
  import helpers from '@/utils/helpers/base'

  export default {
    name: 'nav-bar',
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        consts,
        helpers,
        storehouse: {
          visible: false,
          actions: []
        },
        persons: {
          visible: false,
          actions: []
        },
        notices: {
          visible: false,
          actions: []
        }
      }
    },
    created () {
      this.renderStorehouseActionsheet()
      this.renderPersonsActionsheet()
      this.renderNoticesActionsheet()
    },
    methods: {
      renderStorehouseActionsheet () {
        helpers.isAccessible([consts.PERMISSIONS.MANAGE_MEDICINES]) && this.storehouse.actions.push({
          name: '医疗',
          value: 'medicines'
        })
        helpers.isAccessible([consts.PERMISSIONS.MANAGE_FOODS]) && this.storehouse.actions.push({
          name: '护理消耗品',
          value: 'cares'
        })
        helpers.isAccessible([consts.PERMISSIONS.MANAGE_FOODS]) && this.storehouse.actions.push({
          name: '食堂',
          value: 'foods'
        })
        helpers.isAccessible([consts.PERMISSIONS.MANAGE_SUPPLIES]) && this.storehouse.actions.push({
          name: '日用品',
          value: 'supplies'
        })
        helpers.isAccessible([consts.PERMISSIONS.MANAGE_SUPPLIES]) && this.storehouse.actions.push({
          name: '电器',
          value: 'electricals'
        })
      },
      renderPersonsActionsheet () {
        helpers.isAccessible([consts.PERMISSIONS.MANAGE_STAFFS]) && this.persons.actions.push({
          name: '员工',
          value: 'staffs/staffs'
        })
        helpers.isAccessible([consts.PERMISSIONS.MANAGE_OLDS]) && this.persons.actions.push({
          name: '老人',
          value: 'olds/olds'
        })
        helpers.isAccessible([consts.PERMISSIONS.MANAGE_FAMILIES]) && this.persons.actions.push({
          name: '家属',
          value: 'families/families'
        })
        helpers.isAccessible([consts.PERMISSIONS.MANAGE_CARERS]) && this.persons.actions.push({
          name: '护工',
          value: 'staffs/carers'
        })
      },
      renderNoticesActionsheet () {
        helpers.isAccessible([consts.PERMISSIONS.MANAGE_CARS]) && this.notices.actions.push({
          name: '车辆',
          value: 'cars'
        })
        helpers.isAccessible([consts.PERMISSIONS.MANAGE_MEDICINES]) && this.notices.actions.push({
          name: '医疗库存',
          value: 'medicines'
        })
        helpers.isAccessible([consts.PERMISSIONS.MANAGE_FOODS]) && this.notices.actions.push({
          name: '食堂库存',
          value: 'foods'
        })
        helpers.isAccessible([consts.PERMISSIONS.MANAGE_SUPPLIES]) && this.notices.actions.push({
          name: '日用品库存',
          value: 'supplies'
        })
      },
      handleClickTab (tab) {
        switch (tab) {
          case 'storehouse':
            this.storehouse.visible = true
            break
          case 'cars':
            this.$router.push('/cars/cars/index')
            break
          case 'persons':
            this.persons.visible = true
            break
          case 'notices':
            this.notices.visible = true
            break
          case 'my':
            this.$router.push(`/staffs/staffs/details/${auth.get()['user']['id']}/my`)
            break
          default:
            break
        }
      },
      handleSelectStorehouse (item) {
        this.$router.push(`/products/${item.value}/categories`)
        this.storehouse.visible = false
      },
      handleSelectPersons (item) {
        this.$router.push(`/${item.value}/index`)
        this.persons.visible = false
      },
      handleSelectNotices (item) {
        this.$router.push(`/notices/${item.value}/index`)
        this.notices.visible = false
      }
    }
  }
</script>
