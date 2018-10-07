<template>
  <div>
    <NavBar
      title="我的消息"
      back />
    <div class="p-my-messages o-box has-nav-bar">
      <ul class="c-message-list">
        <li class="c-message-list__item">
          <div class="c-message-list__body fs6">10 月 2 号是陈妈妈的生日，届时养老院会有庆生活动。</div>
          <div class="c-message-list__time c3 fs2">发布于 2018-10-01 09:00</div>
        </li>
        <li class="c-message-list__item">
          <div class="c-message-list__body fs6">陈爸爸备用金仅剩 500 元，请及时缴纳。</div>
          <div class="c-message-list__time c3 fs2">发布于 2018-09-18 09:30</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  import TabBar from '@/components/TabBar'

  export default {
    components: {
      NavBar,
      TabBar
    }
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
