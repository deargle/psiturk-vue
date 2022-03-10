<template lang="html">
  <div class="">

    <div id="container-instructions">

        <h1>Instructions</h1>

        <hr />

        <div class="instructions well">

            <p>
                This is the third page of instructions
            </p>

            <p>
                Put some text in this paragraph
            </p>

        </div>

        <hr />

        <div class="instructionsnav">
            <div class="row">
                <div class="col-xs-2">
                    <button @click="$emit('goto', 'Instruct2')" type="button" id="prev" value="prev" class="btn btn-primary btn-lg previous">
                    <span class="glyphicon glyphicon-arrow-left"></span> Previous
                    </button>
                </div>
                <div class="col-xs-8">
                </div>
                <div class="col-xs-2">
                    <button @click="$emit('goto', 'InstructReady')" type="button" id="next" value="next" class="btn btn-primary btn-lg continue">
                    Next <span class="glyphicon glyphicon-arrow-right"></span>
                    </button>
                </div>
            </div>
        </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      previous: 'Instruction3',
      next: 'Stroop'
    }
  },
  methods: {
    goto_previous() {
      if (this.previous) {
        this.$router.push({name: this.previous})
      }
    },
    goto_next() {
      if (this.next) {
        this.$router.push({name: this.next})
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
