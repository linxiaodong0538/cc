<template>
  <div>
    <NavBar title="健康动态" />
    <div class="p-olds-data o-box has-nav-bar has-tab-bar">
      <OldCard />
      <ul class="c-tabs fs4">
        <li
          class="c-tabs__item"
          @click="$router.push('/olds/trends')">
          <span>健康动态</span>
        </li>
        <li class="c-tabs__item is-active">
          <span>健康数据</span>
        </li>
      </ul>
      <div class="pb-wrap-data">
        <div class="pb-wrap-data__top bg-c1">
          <div class="pb-grid">
            <ul>
              <li >
                <div>
                  <h2 class="fs12">7.4</h2>
                  <div>
                    <span class="fs4 c8">血糖</span>
                    <span class="fs1 c3">mmol/L</span>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <h2 class="fs12">100/77</h2>
                  <div>
                    <span class="fs4 c8">血压</span>
                    <span class="fs1 c3">mmHg</span>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <h2 class="fs12">37.2</h2>
                  <div>
                    <span class="fs4 c8">体温</span>
                    <span class="fs1 c3">℃</span>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <h2 class="fs12">77</h2>
                  <div>
                    <span class="fs4 c8">脉搏</span>
                    <span class="fs1 c3">次/分</span>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <h2 class="fs12">65</h2>
                  <div>
                    <span class="fs4 c8">心率</span>
                    <span class="fs1 c3">次/分</span>
                  </div>
                </div>
              </li>
              <li></li>
            </ul>
          </div>
        </div>

        <div class="pb-wrap-data__bottom bg-c1">
          <table class="o-gridtable">
            <thead>
            <tr>
              <th class="fs4">名称</th>
              <th class="fs4">分类</th>
              <th class="fs4">数量</th>
              <th class="fs4">日期</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="fs4 c8">医护毛巾</td>
              <td class="fs4 c8">医护毛巾</td>
              <td class="fs4 c8">2</td>
              <td class="fs4 c8">2018.05.06</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <TabBar />
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  import TabBar from '@/components/TabBar'
  import OldCard from '@/components/OldCard'
  import { mapState } from 'vuex'
  const module = 'oldHealthRecords'

  export default {
    components: {
      NavBar,
      TabBar,
      OldCard
    },
    async created () {
      const res = await this.getOldData()
      this.oldData = res
      console.log(this.oldData)
    },
    data () {
      return {
        oldData: []
      }
    },
    computed: {
      ...mapState({
        list: state => state[module].list
      })
    },
    methods: {
      getList (num) {
        return this.$store.dispatch(`${module}/getList`, {
          query: {
            where: {
              indicator: {$eq: `${num}`},
              oldId: '2588'
            }
          }
        })
      },
      async getOldData () {
        return Promise.all([this.getList(1), this.getList(2), this.getList(3), this.getList(4), this.getList(5)])
      }
    }
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
