<template>
  <div>
    <NavBar
      title="联系我们"
      back />
    <div class="p-my-contact o-box has-nav-bar">
      <ul class="c-news-list">
        <li class="c-news-list__item">
          <div class="cc-card">
            <img
              class="cc-card__video"
              src="./styles/images/address.png" />
            <div class="cc-card__body">
              <div class="cc-card__title fs8">国际先进养老理念</div>
              <div class="cc-card__desc c8 fs4">
                <a
                  class="c8"
                  href="tel:400-918-9833">
                  400-918-9833
                </a>
              </div>
              <div class="cc-card__time c3 fs2">福州市闽侯荆溪江滨路荔园度假村</div>
              <a
                class="c-icon c-icon--address"
                href="baidumap://map/direction?destination=福州市闽侯荆溪江滨路荔园度假村&mode=driving&region=福州">
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  import TabBar from '@/components/TabBar'
  import Padding from '@/components/Padding'

  export default {
    components: {
      NavBar,
      TabBar,
      Padding
    },
    handleRedirect () {
      const iframe = document.createElement('iframe')
      iframe.src = 'baidumap://map/direction?origin=中关村&destination=五道口&mode=driving&region=北京&src=ios.baidu.openAPIdemo'
      document.body.appendChild(iframe)
    }
  }
</script>

<style lang="scss" src="./styles/index.scss"></style>
