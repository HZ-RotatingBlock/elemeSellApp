<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{ food.name }}</h1>
          <div class="detail">
            <span class="sell-count">月售{{ food.sellCount }}份</span>
            <span class="rating">好评率{{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{ food.price }}</span><span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text" v-show="food.info">{{ food.info }}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-for="rating in food.ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
                <div class="user">
                  <span class="name">{{ rating.username }}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{ rating.rateTime | formatDate }}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down':rating.rateType === 1}"></span>{{ rating.text }}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import split from '@/components/split/split'
import ratingselect from '@/components/ratingselect/ratingselect'
import Bus from '@/public/js/eventBus'
import { formatDate } from '@/public/js/date'

// 所有评价
const ALL = 2

export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  methods: {
    show () {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = false
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          // 重新计算
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addFirst (event) {
      // 防止多次点击
      if (!event._constructed) {
        return
      }
      Bus.$emit('cart.add', event.target)
      Vue.set(this.food, 'count', 1)
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  mounted () {
    Bus.$on('ratingType.select', (selectType) => {
      this.selectType = selectType
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    })
    Bus.$on('content.toggle', (onlyContent) => {
      this.onlyContent = onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../public/sass/mixin.scss";

  .move-enter-active,
  .move-leave-active,
  .fade-enter-active,
  .fade-leave-active {
    transition: all .3s ease;
  }
  .move-enter,
  .move-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    // transform: scale(0);
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: scale(0);
  }
  .food {
    z-index: 30;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    width: 100%;
    background: #ffffff;
    .food-content {
      .image-header {
        position: relative;
        padding-top: 100%;
        width: 100%;
        height: 0;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .back {
          position: absolute;
          top: 10px;
          left: 5px;
          width: 30px;
          height: 30px;
          background: rgba(51, 51, 51, .7);
          border-radius: 50%;
          .icon-arrow_lift {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            padding: 10px;
            font-size: 20px;
            color: #fff;
            transform: translate(-50%, -50%);
          }
        }
      }
      .content {
        position: relative;
        padding: 18px;
        .title {
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
          line-height: 14px;
          color: rgb(7, 17, 27);
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .old {
            text-decoration: line-through;
            font-size: 10px;
            font-weight: 700;
            color: rgb(7, 17, 27);
          }
        }
        .detail {
          margin-bottom: 18px;
          height: 10px;
          font-size: 0;
          line-height: 10px;
          color: rgb(147, 153, 159);
          .sell-count,
          .rating {
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .sell-count {
            margin-right: 12px;
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
        .buy {
          z-index: 10;
          position: absolute;
          right: 18px;
          bottom: 18px;
          padding: 0 12px;
          height: 24px;
          font-size: 10px;
          line-height: 24px;
          color: #ffffff;
          background: rgb(0, 160, 220);
          box-sizing: border-box;
          border-radius: 12px;
        }
      }
      .info {
        padding: 18px;
        .title {
          margin-bottom: 8px;
          font-size: 14px;
          line-height: 14px;
          color: rgb(7, 17, 27);
        }
        .text {
          padding: 0 8px;
          font-size: 12px;
          font-weight: 200;
          line-height: 24px;
          color: rgb(77, 85, 93);
        }
      }
      .rating {
        padding-top: 18px;
        .title {
          margin-left: 18px;
          font-size: 14px;
          line-height: 14px;
          color: rgb(7, 17, 27);
        }
        .rating-wrapper {
          padding: 0 18px;
          .rating-item {
            position: relative;
            padding: 16px 0;
            @include border-1px(rgba(7, 17, 27, .1));
            .user {
              position: absolute;
              top: 16px;
              right: 0;
              font-size: 0;
              line-height: 12px;
              .name {
                display: inline-block;
                margin-right: 6px;
                font-size: 10px;
                vertical-align: top;
                color: rgb(147, 153, 159);
              }
              .avatar {
                border-radius: 50%;
              }
            }
            .time {
              margin-bottom: 6px;
              font-size: 10px;
              line-height: 12px;
              color: rgb(147, 153, 159);
            }
            .text {
              font-size: 12px;
              line-height: 16px;
              color: rgb(7, 17, 27);
              .icon-thumb_up,
              .icon-thumb_down {
                margin-right: 4px;
                font-size: 12px;
                line-height: 16px;
              }
              .icon-thumb_up {
                color: rgb(0, 160, 220);
              }
              .icon-thumb_down {
                color: rgb(147, 153, 159);
              }
            }
          }
          .no-rating {
            padding: 16px 0;
            font-size: 12px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
</style>
