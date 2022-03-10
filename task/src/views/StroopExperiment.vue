<template lang="html">
  <div id="container-exp">
    <div id="trial">
      <h1>Respond Quickly!</h1>
      <p>What color is this word?</p>
      <div id="stim" ref="stim" v-if="stim">
        <StroopWord :color="stim[1]">
        {{ stim[0] }}
        </StroopWord>
      </div>
      <div id="query">
        <p id="prompt">Type "R" for Red, "B" for blue, "G" for green.</p>
      </div>
    </div>
  </div>
</template>

<script>

import * as _ from 'underscore';

import StroopWord from '@/components/StroopWord.vue'

export default {
  components: {
    StroopWord
  },
  data() {
    return {
      wordon: null, // time word is presented
      listening: false,
      stim: null,
      stims: [     // Stimuli for a basic Stroop experiment
        ["SHIP", "red", "unrelated"],
        ["MONKEY", "green", "unrelated"],
        ["ZAMBONI", "blue", "unrelated"],
        ["RED", "red", "congruent"],
        ["GREEN", "green", "congruent"],
        ["BLUE", "blue", "congruent"],
        ["GREEN", "red", "incongruent"],
        ["BLUE", "green", "incongruent"],
        ["RED", "blue", "incongruent"]
      ]
    }
  },
  mounted() {
    this.$nextTick(function () {
      // Start the test
      this.next();
    })
  },
  created() {

    this.$store.dispatch('startTask')
    
    // Register the response handler that is defined above to handle any
    // key down events.
    window.addEventListener('keydown', this.response_handler)

    this.stims = _.shuffle(this.stims);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.response_handler)
  },
  methods: {
    next() {
      if (this.stims.length===0) {
        this.finish();
      }
      else {
        this.show_word()
        this.wordon = new Date().getTime();
        this.listening = true;
      }
    },

    finish() {
      this.$router.push({name: 'Questionnaire'})
    },

    show_word() {
      this.stim = this.stims.shift();
    },

    remove_word() {
      this.stim = null
    },

    response_handler(e) {
      if (!this.listening) return;

      var keyCode = e.keyCode,
        response;

      switch (keyCode) {
        case 82:
          // "R"
          response="red";
          break;
        case 71:
          // "G"
          response="green";
          break;
        case 66:
          // "B"
          response="blue";
          break;
        default:
          response = "";
          break;
      }
      if (response.length > 0) {
        this.listening = false;
        var hit = response == this.stim[1];
        var rt = new Date().getTime() - this.wordon;

        this.$store.commit('recordTrialData', {'phase': "TEST",
                                         'word': this.stim[0],
                                         'color': this.stim[1],
                                         'relation': this.stim[2],
                                         'response': response,
                                         'hit': hit,
                                         'rt': rt
                                       });
        // this.remove_word();
        this.next();
      }
    }
  }


}
</script>

<style lang="css" scoped>
</style>
