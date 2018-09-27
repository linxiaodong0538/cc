<template>
  <div>
    <NavBar :title="consts.ALIASES[where.alias] + ' - 维修保养记录'"></NavBar>
    <div class="main">
      <div v-if="items && items.length">
        <van-cell-group>
          <van-cell v-for="item in items" :key="item.id" :title="item.reason" is-link
                    @click="$router.push(`/cars/${where.alias}/breakdowns/details/${item.id}`)" />
        </van-cell-group>
        <Padding>
          <van-pagination
            v-model="pagination.current"
            :page-count="Math.ceil(carBreakdowns.carBreakdowns.total / consts.PAGE_SIZE)"
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
    async created () {
      this.carBreakdowns.carBreakdowns = {}

      this.$set(this.where, 'alias', this.$route.params.alias)

      this.getItems()
    },
    data () {
      return {
        consts,
        tabBar: {
          active: 1
        },
        items: [],
        pagination: {
          current: 1
        },
        where: {
          title: {
            $like: ''
          }
        }
      }
    },
    computed: mapState([
      'carBreakdowns'
    ]),
    methods: {
      getItems (current = 1) {
        this.pagination.current = current

        return this.$store.dispatch('getCarBreakdowns', {
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
      }
    },
    watch: {
      'pagination.current': {
        handler (newVal) {
          this.getItems(newVal)
        }
      },
      'carBreakdowns.carBreakdowns': {
        handler (newVal) {
          this.items = newVal.items
        }
      }
    }
  }
</script>
