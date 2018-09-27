<template>
  <div>
    <NavBar :title="consts.ALIASES[where.alias] + ' - 家属列表'"></NavBar>
    <div class="main">
      <van-search v-model="where.name.$like" placeholder="请输入姓名" show-action @search="handleSearch">
        <div slot="action" @click="handleSearch">搜索</div>
      </van-search>
      <Padding v-if="items && items.length" :dirs="['top']">
        <van-cell-group>
          <van-cell v-for="item in items" :key="item.id" :title="item.name" is-link
                    @click="$router.push(`/families/${where.alias}/details/${item.id}`)" />
        </van-cell-group>
        <Padding>
          <van-pagination
            v-model="pagination.current"
            :page-count="Math.ceil(families.families.total / consts.PAGE_SIZE)"
            mode="simple" />
        </Padding>
      </Padding>
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
    async beforeRouteUpdate (to, from, next) {
      this.families.families = {}

      const { alias } = to.params

      this.$set(this.where, 'alias', alias)

      this.getItems()

      next()
    },
    async created () {
      this.families.families = {}

      const { alias } = this.$route.params

      this.$set(this.where, 'alias', alias)

      this.getItems()
    },
    data () {
      return {
        consts,
        tabBar: {
          active: 2
        },
        items: [],
        pagination: {
          current: 1
        },
        where: {
          name: {
            $like: ''
          }
        }
      }
    },
    computed: mapState([
      'families'
    ]),
    methods: {
      getItems (current = 1) {
        this.pagination.current = current

        return this.$store.dispatch('getFamilies', {
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
      'families.families': {
        handler (newVal) {
          this.items = newVal.items
        }
      }
    }
  }
</script>
