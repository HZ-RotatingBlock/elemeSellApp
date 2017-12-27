<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive" :class="{'active': selectType === 2}" @click="select(2, $event)">
        {{ desc.all }}
        <span class="count">{{ ratings.length }}</span>
      </span>
      <span class="block positive" :class="{'active': selectType === 0}" @click="select(0, $event)">
        {{ desc.positive }}
        <span class="count">{{ positives.length }}</span>
      </span>
      <span class="block negative" :class="{'active': selectType === 1}" @click="select(1, $event)">
        {{ desc.negative }}
        <span class="count">{{ negatives.length }}</span>
      </span>
    </div>
    <div class="switch" :class="{'on': onlyContent}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
import Bus from '@/public/js/eventBus'

// 用常量表示增加代码可读性
// 正向评价
const POSITIVE = 0
// 负向评价
const NEGATIVE = 1
// 所有评价
const ALL = 2

export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    // 选择过滤
    selectType: {
      type: Number,
      default: ALL
    },
    // 显示内容
    onlyContent: {
      type: Boolean,
      default: false
    },
    // 描述
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  methods: {
    select (type, event) {
      if (!event._constructed) {
        return
      }
      // 由于不能直接修改父组件传递过来的参数，因此需要通过事件中心管理组件来发布时间同时传递修改的参数，同时在父组件通过管理组件的 $on监听事件并执行监听回调修改对应参数
      // this.selectType = type
      Bus.$emit('ratingType.select', type)
    },
    toggleContent (event) {
      if (!event._constructed) {
        return
      }
      // 由于不能直接修改父组件传递过来的参数，因此需要通过事件中心管理组件来发布时间同时传递修改的参数，同时在父组件通过管理组件的 $on监听事件并执行监听回调修改对应参数
      // this.onlyContent = !this.onlyContent
      Bus.$emit('content.toggle', !this.onlyContent)
    }
  },
  computed: {
    positives () {
      // 从父组件传递过来的ratings对象似乎包含有卖家评论的对象数组，数组中的每个元素都是对象，对象中有 rateType 属性对应评论所属的类别，类型为 Number
      // 使用js的筛选方法filter来按照条件筛选值返回拥有符合条件的元素的新的数组
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives () {
      // 使用js的筛选方法filter来按照条件筛选值返回拥有符合条件的元素的新的数组
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../public/sass/mixin.scss';

  .ratingselect {
    .rating-type {
      margin: 0 18px;
      padding: 18px 0;
      font-size: 0;
      @include border-1px(rgba(7, 17, 27, .1));
      .block {
        display: inline-block;
        margin-right: 8px;
        padding: 8px 12px;
        font-size: 12px;
        line-height: 16px;
        color: rgb(77, 85, 93);
        border-radius: 1px;
        &.active {
          color: #ffffff;
        }
        .count {
          margin-left: 2px;
          font-size: 8px;
        }
        &.positive {
          background: rgba(0, 160, 220, .2);
          &.active {
            background: rgba(0, 160, 220, 1);
          }
        }
        &.negative {
          background: rgba(77, 85, 93, .2);
          &.active {
            background: rgba(77, 85, 93, 1);
          }
        }
      }
    }
    .switch {
      padding: 12px 18px;
      font-size: 0;
      line-height: 24px;
      color: rgb(147, 153, 159);
      border-bottom: 1px solid rgba(7, 17, 27, .1);
      &.on {
        .icon-check_circle {
          color: #00c850;
        }
      }
      .icon-check_circle {
        display: inline-block;
        margin-right: 4px;
        font-size: 24px;
        vertical-align: top;
      }
      .text {
        display: inline-block;
        font-size: 12px;
        line-height: 24px;
        vertical-align: top;
      }
    }
  }
</style>
