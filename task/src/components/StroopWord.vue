<template lang="html">
  <div class="" id="word" :style="cssProps">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    },
  },
  computed: {
    cssProps() {
      return {
        '--color': this.color
      }
    }
  }
}
</script>

<style lang="css" scoped>
  #word {
    text-align: center;
    font-size: 150px;
    font-weight: 400;
    margin: 20px;
    color: var(--color);
  }
</style>
