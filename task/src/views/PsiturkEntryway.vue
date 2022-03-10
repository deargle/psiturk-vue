<template lang="html">
  <div class="">

  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  created: function () {
    let form = { }
    form.uniqueId = this.$route.query.uniqueId
    form.mode = this.$route.query.mode
    form.condition = this.$route.query.condition
    this.$store.commit('setParticipant', form)
    this.$router.push({name: 'Instructions'})
  }
}
</script>

<style lang="css" scoped>
</style>
