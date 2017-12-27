<template>
    <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <!-- 商家头像 -->
          <img :src="seller.avatar" width="64" height="64"/>
        </div>
        <!-- 商家基本信息 -->
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{ seller.name }}</span>
          </div>
          <div class="description">
            {{ seller.description }} / {{ seller.deliveryTime }}分钟送达
          </div>
          <div v-if="seller.supports" class="supports">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{ seller.supports[0].description }}</span>
          </div>
        </div>
        <!-- 商家活动 -->
        <div class="support-count" v-if="seller.supports" @click="showDetail">
          <span class="count">{{ seller.supports.length }}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <!-- 头部公告 -->
      <div class="bulletin-wrapper" @click="showDetail">
        <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="background" :style="{backgroundImage: 'url(' + seller.avatar + ')'}">
      </div>
      <!-- 详情遮罩 -->
      <transition name="fade">
        <div class="detail" v-show="detailShow">
          <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <h1 class="name">{{ seller.name }}</h1>
              <div class="star-wrapper">
                <star :size="48" :score="seller.score"></star>
              </div>
              <div class="title">
                <div class="text">优惠信息</div>
              </div>
              <ul v-if="seller.supports" class="supports">
                <li class="support-item" v-for="(item, index) in seller.supports">
                  <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                  <span class="text">{{ seller.supports[index].description }}</span>
                </li>
              </ul>
              <div class="title">
                <div class="text">商家公告</div>
              </div>
              <div class="bulletin">
                <p class="content">{{ seller.bulletin }}</p>
              </div>
            </div>
          </div>
          <!-- 遮罩关闭按钮 -->
          <div class="detail-close">
            <i class="icon-close"  @click="hideDetail"></i>
          </div>
        </div>
      </transition>
    </div>
</template>

<script type="text/ecmascript-6">
  import star from '@/components/star/star'

  export default {
    data () {
      return {
        detailShow: false,
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    props: {
      seller: {
        type: Object,
        default: {}
      }
    },
    components: {
      star
    },
    methods: {
      showDetail () {
        this.detailShow = true
      },
      hideDetail () {
        this.detailShow = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../public/sass/mixin.scss";

  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter,  {
    opacity: 0;
    transition: all .5s;
  }
  .fade-leave-active {
    opacity: 0;
  }

  .header {
    overflow: hidden;
    position: relative;
    color: #fff;
    background-color: rgba(7, 17, 27, .5);
    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      .avatar {
        display: inline-block;
        img {
          border-radius: 2px;
        }
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        .title {
          margin: 2px 0 8px 0;
          .brand {
            display: inline-block;
            width: 30px;
            height: 18px;
            vertical-align: top;
            @include bg-image('brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }
          .name {
            margin-left: 6px;
            font-size: 16px;
            font-weight: bold;
          }
        }
        .description {
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px;
        }
        .supports {
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            vertical-align: top;
            &.decrease {
              @include bg-image('decrease_1')
            }
            &.discount {
              @include bg-image('discount_1')
            }
            &.guarantee {
              @include bg-image('guarantee_1')
            }
            &.invoice {
              @include bg-image('invoice_1')
            }
            &.special {
              @include bg-image('special_1')
            }
          }
          .text {
            font-size: 10px;
            line-height: 12px;
            vertical-align: top;
          }
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 18px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 14px;
        background-color: rgba(0, 0, 0, .2);
        .count {
          font-size: 10px;
        }
        .icon-keyboard_arrow_right {
          margin-left: 2px;
          font-size: 10px;
          line-height: 24px;
        }
      }
    }
    .bulletin-wrapper {
      position: relative;
      padding: 0 22px 0 12px;
      height: 28px;
      line-height: 28px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background-color: rgba(7, 17, 27, .2);
      .bulletin-title {
        display: inline-block;
        vertical-align: top;
        margin-top: 8.4px;
        width: 22px;
        height: 12px;
        @include bg-image('bulletin');
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .bulletin-text {
        margin: 0 4px;
        font-size: 10px;
        line-height: 28px;
        vertical-align: top;
      }
      .icon-keyboard_arrow_right {
        position: absolute;
        top: 50%;
        right: 12px;
        font-size: 10px;
        transform: translateY(-50%);
      }
    }
    .background {
      filter: blur(10px);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: left top;
      background-repeat: no-repeat;
      z-index: -1;
    }
    .detail {
      overflow: auto;
      z-index: 100;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, .8);
      // iphone手机背景模糊
      backdrop-filter: blur(10px);
      .detail-wrapper {
        display: block;
        margin: 0 auto;
        padding-top: 64px;
        width: 80%;
        min-height: calc(100% - 64px);
        .detail-main {
          margin: 0 auto;
          padding-bottom: 64px;
          font-size: 12px;
          line-height: 24px;
          .name {
            font-size: 16px;
            font-weight: 700;
            line-height: 16px;
            text-align: center;
          }
          .star-wrapper {
            margin-top: 16px;
            padding: 2px 0;
            text-align: center;
          }
          .title {
            display: flex;
            margin: 16px auto 24px auto;
            width: 100%;
            &:after,
            &:before {
              flex: 1;
              content: '';
              position: relative;
              top: -12px;
              border-bottom: 1px solid rgba(255, 255, 255, .2);
            }
            .text {
              padding: 0 12px;
              font-size: 14px;
              font-weight: 700;
            }
          }
          .supports {
            margin: 0 auto;
            width: 100%;
            .support-item {
              margin-bottom: 6px;
              padding: 0 12px;
              font-size: 0;
              &:last-child {
                margin-bottom: 0;
              }
              .icon {
                display: inline-block;
                margin-right: 6px;
                width: 16px;
                height: 16px;
                vertical-align: top;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                &.decrease {
                  @include bg-image('decrease_2')
                }
                &.discount {
                  @include bg-image('discount_2')
                }
                &.guarantee {
                  @include bg-image('guarantee_2')
                }
                &.invoice {
                  @include bg-image('invoice_2')
                }
                &.special {
                  @include bg-image('special_2')
                }
              }
              .text {
                font-size: 12px;
                line-height: 16px;
              }
            }
          }
          .bulletin {
            margin: 0 auto;
            width: 100%;
            .content {
              padding: 0 12px;
              font-size: 12px;
              line-height: 24px;
            }
          }
        }
      }
      .detail-close {
        position: relative;
        margin: -64px auto 0 auto;
        width: 32px;
        height: 32px;
        font-size: 32px;
        clear: both;
      }
    }
  }

</style>
