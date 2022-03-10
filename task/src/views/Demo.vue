<template lang="html">
  <div class="">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="UniqueId:"
        label-for="input-1"
        description=""
      >
        <b-form-input
          id="input-1"
          v-model="form.uniqueId"
          placeholder="Enter uniqueId"
          minlength="21" maxlength="21"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Condition:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.condition"
          placeholder="Enter condition"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Mode:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.mode"
          placeholder="Enter mode"
          required
        ></b-form-input>
      </b-form-group>

      <div class='action-bar'>
        <b-button type="submit" variant="primary" class='mr-1'>Go</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>

    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
      return {
        form: {
          uniqueId: null,
          condition: null,
          mode: 'debug',
        },
        show: true
      }
  },
  computed: {

  },
  mounted() {
    this.do_reset()
  },
  methods: {
    get_random_id() {
      return "debug" + this.makeid()
    },
    onSubmit(event) {
      event.preventDefault()
      this.$store.commit('setParticipant', this.form)
      this.$router.push({name: 'Instructions'})
    },
    onReset(event) {
      event.preventDefault()
      this.do_reset()
    },
    do_reset(){
      // Reset our form values
      this.form.uniqueId = this.get_random_id() + ':' + this.get_random_id(),
      this.form.condition = 0,
      this.form.mode = 'debug',

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 5; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    }
  }
}
</script>

<style lang="css" scoped>

  .action-bar .btn {
    width: 5em;
  }
</style>
