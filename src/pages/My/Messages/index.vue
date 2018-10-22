<template>
  <div>
    <NavBar
      title="我的消息"
      back />
    <div class="p-my-messages o-box has-nav-bar">
      <ul class="c-message-list">
        <li class="c-message-list__item" v-for="(item, index) in list.items " :key="index">
          <div class="c-message-list__body fs6">{{item.content}}</div>
          <div class="c-message-list__time c3 fs2">{{item.created_at}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  import TabBar from '@/components/TabBar'
  import { mapState } from 'vuex'
  const module = 'messages'

  export default {
    components: {
      NavBar,
      TabBar
    },
    created () {
      this.getMessagesList()
    },
    data () {
      return {}
    },
    computed: {
      ...mapState({
        list: state => state[module].list
      })
    },
    methods: {
      async getMessagesList () {
        await this.$store.dispatch(`${module}/getList`, {
          query: {
            offset: 0,
            limit: 100
          }
        })
      }
    },
    mounted () {}
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
