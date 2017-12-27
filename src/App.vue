<template>
  <div id="app">
    <keep-alive>
      <v-header :seller="seller"></v-header>
    </keep-alive>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import VHeader from '@/views/header/header'
import VRatings from '@/views/ratings/ratings'
import VSeller from '@/views/seller/seller'
import { urlParse } from '@/public/js/util'

export default {
  name: 'app',
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  components: {
    VHeader,
    VRatings,
    VSeller
  },
  methods: {
    getData () {
      this.$axios.get('https://easy-mock.com/mock/5a3b1e9bab7fde5ac993b2de/elemeSellAppData/sellerData').then((res) => {
        if (res) {
          // this.seller = res.data.seller
          // console.log(this.seller.id)
          this.seller = Object.assign({}, this.seller, res.data.seller)
          // console.log(this.seller)
          console.log(this.seller.id)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./public/sass/mixin";
  #app {
    .tab {
      display: flex;
      width: 100%;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      @include border-1px(rgba(7, 17, 27, .1));
      .tab-item {
        flex: 1;
        text-align: center;
        & > a {
          display: block;
          font-size: 14px;
          color: rgb(77, 85, 93);
          &.active {
            color: rgb(240, 20, 20);
          }
        }
      }
    }
  }
</style>
