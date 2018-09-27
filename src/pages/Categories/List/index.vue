<template>
  <div>
    <NavBar :title="'仓库 - ' + consts.ALIASES[where.alias] + ' - 分类'"></NavBar>
    <div class="main">
      <div v-for="item1 in items">
        <div class="title">{{ item1.title }}</div>
        <van-cell-group>
          <van-cell v-for="item2 in item1.children" :key="item2.id" :title="item2.title" is-link
                    @click="$router.push(`/products/${where.alias}/list/${item2.id}`)" />
        </van-cell-group>
      </div>
    </div>
    <TabBar v-model="tabBar.active"></TabBar>
  </div>
</template>

<script>
  import consts from '@/utils/consts'
  import NavBar from '@/components/NavBar'
  import TabBar from '@/components/TabBar'
  import CategoriesModel from '@/models/categories'
  import arrayToTree from 'array-to-tree'

  export default {
    name: 'list',
    components: {
      NavBar,
      TabBar
    },
    async beforeRouteUpdate (to, from, next) {
      this.$set(this.where, 'alias', to.params.alias)
      this.items = []
      this.getItems()
      next()
    },
    async created () {
      this.$set(this.where, 'alias', this.$route.params.alias)
      this.items = []
      this.getItems()
    },
    data () {
      return {
        consts,
        items: [],
        tabBar: {
          active: 0
        },
        where: {}
      }
    },
    methods: {
      async getItems () {
        const getCategoriesRes = await new CategoriesModel().GET({
          query: {
            offset: 0,
            limit: 1000,
            where: this.where
          }
        })
        this.items = arrayToTree(getCategoriesRes.data.items)
      }
    }
  }
</script>
