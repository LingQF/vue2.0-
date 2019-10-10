<template>
  <div
    ref="compButton"
    :style="{
      width: width,
      height: height,
      fontSize: size
    }"
    :class="classes()"
    @click="handleClick"
    >
    {{btntext}}
  </div>
</template>

<script>
export default {
  name: 'compButton',
  props: {
    btntext: String,
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    size: {
      type: String,
      default: '.14rem'
    },
    /**
     * @params {String} [type] 可传参数
     * 默认不传 蓝底白字
     * active 默认透明 0.5 激活状态
     * info 白底蓝字
     * gray 灰色底 蓝字
     */
    type: String
  },
  mounted () {
    this.setBorderRadius()
  },
  methods: {
    setBorderRadius () {
      let ref = this.$refs.compButton
      let height = ref.offsetHeight
      ref.style.borderRadius = height / 2 + 'px'
    },
    classes () {
      return [
        'comp-button',
        `comp-button-${this.type}`
      ]
    },
    handleClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss">
  .comp-button {
    @include flex();
    font-weight: 500;
    background-color: #2b68f6; // 默认蓝色背景
    color: #ffffff;
    &:active {
      transition: transform .3s;
      transform: scale(.9);
    }
    &-info {
      border:1px solid rgba(43,104,246,1);
      color:rgba(43,104,246,1);
      background: #ffffff;
    }
    &-active {
      background:rgba(43,104,246,1);
      opacity: 0.5;
    }
    &-gray {
      background:rgba(241,241,243,1);
      color:rgba(9,84,255,1);
    }
  }
</style>
