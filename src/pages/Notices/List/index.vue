<template>
  <div>
    <NavBar :title="'告警 - ' + consts.ALIASES[where.alias]"></NavBar>
    <div class="main">
      <div v-if="items && items.length">
        <van-cell-group>
          <van-cell v-for="item in items" :key="item.id" :title="`[${time.getDate(time.created_at)}] ${item.content}`"
                    is-link
                    @click="handleClickNotice(item.resource_id)" />
        </van-cell-group>
        <Padding>
          <van-pagination
            v-model="pagination.current"
            :page-count="Math.ceil(total / consts.PAGE_SIZE)"
            mode="simple" />
        </Padding>
      </div>
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
    name: 'list',
    components: {
      NavBar,
      TabBar,
      Padding
    },
    async beforeRouteUpdate (to, from, next) {
      this.cars.cars = {}

      this.where.alias = to.params.alias

      this.getItems()

      next()
    },
    async created () {
      this.cars.cars = {}

      this.where.alias = this.$route.params.alias

      this.getItems()
    },
    data () {
      return {
        consts,
        time,
        tabBar: {
          active: 3
        },
        items: [],
        total: 0,
        pagination: {
          current: 1
        },
        where: {
          alias: '',
          title: {
            $like: ''
          }
        }
      }
    },
    computed: mapState([
      'cars',
      'notices'
    ]),
    methods: {
      getItems (current = 1) {
        this.pagination.current = current

        return this.$store.dispatch('getNotices', {
          query: {
            offset: (current - 1) * consts.PAGE_SIZE,
            limit: consts.PAGE_SIZE,
            where: this.where
          }
        })
      },
      handlePageChange (current) {
        this.getItems(current)
      },
      handleSearch () {
        this.pagination.current = 1
        this.getItems()
      },
      handleClickNotice (id) {
        switch (this.where.alias) {
          case 'cars':
            this.$router.push(`/cars/${this.where.alias}/details/${id}`)
            break
          default:
            this.$router.push(`/products/${this.where.alias}/details/${id}`)
            break
        }
      }
    },
    watch: {
      'pagination.current': {
        handler (newVal) {
          this.getItems(newVal)
        }
      },
      'notices.notices': {
        handler (newVal) {
          this.items = newVal.items
          this.total = newVal.total
        }
      }
    }
  }
</script>
