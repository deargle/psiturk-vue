<template lang="html">
  <div class="">
    <router-view v-on:goto="goto"></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$router.push({name: 'Instruct1'})
  },
  methods: {
    goto(route_name) {
      this.$router.push({name: route_name})
    }
  }
}
</script>

<style lang="css" scoped>
</style>
