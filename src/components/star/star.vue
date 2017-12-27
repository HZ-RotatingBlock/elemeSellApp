<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
// 星长
const LENGTH = 5
// 亮星
const CLS_ON = 'on'
// 半星
const CLS_HALF = 'half'
// 暗星
const CLS_OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    // 根据传入的size值决定使用的星星大小样式
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = []
      // 取0.5倍数的值
      let score = Math.floor(this.score * 2) / 2
      // 判断是否有小数
      let hasDecimal = score % 1 !== 0
      // 计算全星数量
      let integer = Math.floor(score)
      // 推入代表全星的CLS_ON
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      // 若有半星则推入
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      // 全星和半星推入完毕后，若结果数组长度依然小于星星总数，则添加暗星补全
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../public/sass/mixin.scss";

  .star {
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48 {
      .star-item {
        margin-right: 22px;
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-image('star48_on');
        }
        &.half {
          @include bg-image('star48_half');
        }
        &.off {
          @include bg-image('star48_off');
        }
      }
    }
    &.star-36 {
      .star-item {
        margin-right: 6px;
        width: 15px;
        height: 15px;
        background-size: 15px 15px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-image('star36_on');
        }
        &.half {
          @include bg-image('star36_half');
        }
        &.off {
          @include bg-image('star36_off');
        }
      }
    }
    &.star-24 {
      .star-item {
        margin-right: 3px;
        width: 10px;
        height: 10px;
        background-size: 10px 10px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-image('star24_on');
        }
        &.half {
          @include bg-image('star24_half');
        }
        &.off {
          @include bg-image('star24_off');
        }
      }
    }
  }
</style>
