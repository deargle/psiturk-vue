<template lang="html">
  <div class="">
    <h1>Complete!</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_development: process.env.NODE_ENV == 'development'
    }
  },
  created() {
    if (!this.is_development) {
      this.$store.dispatch('completeHIT')
    }
  },
  mounted() {

  }

}
</script>

<style lang="css" scoped>
</style>
