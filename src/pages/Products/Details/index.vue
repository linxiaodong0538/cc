<template>
  <div>
    <NavBar :title="'仓库 - ' + consts.ALIASES[where.alias] + ' - 详情'"></NavBar>
    <div class="main">
      <van-swipe :autoplay="3000" :style="'width: 100%; height:' + imageHeight + 'px;'">
        <van-swipe-item v-if="details.picture1">
          <img :src="helpers.getImageURL({ id: details.picture1 })"
               :style="'width: 100%; height:' + imageHeight + 'px;'" />
        </van-swipe-item>
        <van-swipe-item v-if="details.picture2">
          <img :src="helpers.getImageURL({ id: details.picture2 })"
               :style="'width: 100%; height:' + imageHeight + 'px;'" />
        </van-swipe-item>
      </van-swipe>
      <Padding>
        <van-row gutter="15">
          <van-col span="12">
            <van-button size="normal" block @click="showDialog('subtractStock')">出库</van-button>
          </van-col>
          <van-col span="12">
            <van-button size="normal" block @click="showDialog('addStock')">入库</van-button>
          </van-col>
        </van-row>
      </Padding>
      <van-cell-group>
        <van-cell title="品名" :value="details.title"></van-cell>
        <van-cell title="价格" :value="details.price + ' 元'"></van-cell>
        <van-cell title="库存" :value="details.stock + ' 件'" is-link @click="showDialog('modifyStock')"></van-cell>
        <van-cell title="采购地点" :value="details.purchase_address"></van-cell>
        <van-cell title="商家电话" :value="details.seller_telephone"></van-cell>
        <van-cell title="厂家信息" :value="details.manufacturer_info"></van-cell>
        <van-cell title="备注" :value="details.remark"></van-cell>
      </van-cell-group>
      <van-dialog
        title="修改库存"
        v-model="modifyStock.visible"
        show-cancel-button
        @confirm="handleBeforeStockClose('modifyStock')">
        <van-field
          v-model="modifyStock.stock"
          label="库存数量"
          placeholder="请输入库存数量"
          required
        />
      </van-dialog>
      <van-dialog
        title="入库"
        v-model="addStock.visible"
        show-cancel-button
        @confirm="handleBeforeStockClose('addStock')">
        <van-field
          v-model="addStock.stock"
          label="入库数量"
          placeholder="请输入入库数量"
          required />
      </van-dialog>
      <van-dialog
        title="出库"
        v-model="subtractStock.visible"
        show-cancel-button
        @confirm="handleBeforeStockClose('subtractStock')">
        <van-field
          v-model="subtractStock.stock"
          label="出库数量"
          placeholder="请输入出库数量"
          required />
        <van-field
          v-model="subtractStock.recipient"
          label="领用人"
          placeholder="请输入领用人" />
      </van-dialog>
    </div>
    <TabBar v-model="tabBar.active"></TabBar>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import consts from '@/utils/consts'
  import helpers from '@/utils/helpers/base'
  import auth from '@/utils/auth'
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
        tabBar: {
          active: 0
        },
        id: '',
        where: {},
        details: {},
        addStock: {
          visible: false,
          recipient: '',
          stock: ''
        },
        subtractStock: {
          visible: false,
          recipient: '',
          stock: ''
        },
        modifyStock: {
          visible: false,
          recipient: '',
          stock: ''
        }
      }
    },
    computed: {
      ...mapState([
        'products'
      ]),
      imageHeight () {
        return window.screen.width * 9 / 16
      }
    },
    methods: {
      getDetails (id) {
        return this.$store.dispatch('getProduct', { id })
      },
      async handleBeforeStockClose (type) {
        const { id, title, price } = this.details
        const data = {
          product_id: id,
          product_title: title,
          product_price: price,
          operator: auth.get()['user']['name'],
          alias: this.where.alias
        }

        if (type === 'modifyStock') {
          const { stock } = this.modifyStock

          if (!stock) {
            this.$toast('库存数量不能为空')
            return
          }

          try {
            await this.$dialog.confirm({
              title: '请确认',
              message: '修改库存数量需谨慎，是否确认修改？'
            })

            await this.$store.dispatch('putProduct', {
              id: this.details.id,
              body: {
                stock
              }
            })

            this.$toast('修改库存成功')
          } catch (e) {
            this.$toast('已取消')
          }
        } else if (type === 'addStock') {
          if (!this.addStock.stock) {
            this.$toast('入库数量不能为空')
            return
          }

          await this.$store.dispatch('putProduct', {
            id: this.details.id,
            body: {
              stock: +this.details.stock + +this.addStock.stock
            }
          })

          await this.$store.dispatch('postProductStock', {
            body: {
              ...data,
              type: 1,
              recipient: this.addStock.recipient,
              count: this.addStock.stock
            }
          })

          this.$toast('入库成功')
        } else if (type === 'subtractStock') {
          if (!this.subtractStock.stock) {
            this.$toast('出库数量不能为空')
            return
          }

          await this.$store.dispatch('putProduct', {
            id: this.details.id,
            body: {
              stock: +this.details.stock - +this.subtractStock.stock
            }
          })

          await this.$store.dispatch('postProductStock', {
            body: {
              ...data,
              type: 2,
              recipient: this.subtractStock.recipient,
              count: this.subtractStock.stock
            }
          })

          this.$toast('出库成功')
        }

        this.getDetails(this.id)
      },
      showDialog (type) {
        if (type === 'modifyStock') {
          this[type].visible = true
        } else {
          this[type] = {
            visible: true,
            recipient: '',
            stock: ''
          }
        }
      }
    },
    watch: {
      'products.product': {
        handler (newVal) {
          this.details = newVal
          this.modifyStock.stock = this.details.stock
        }
      }
    }
  }
</script>
