<template lang="html">
  <div class="">

    <div id="container-questionnaire">
        <h1>Task Complete</h1>

        <hr />

        <p>You are finished!  Thank you for your contributions to science. You will be eligible for full payment once you answer the following questions.</p>

        <div class="instructions well">

            <form id="postquiz" action="debrief" method="post">


                <!-- beginning of a question -->
                <div class="row question">
                    <div class="col-md-8">
                        On a scale of 1-10 (where 10 is the most engaged), please rate how <b>ENGAGING</b> you found the learning task:
                    </div>
                    <div class="col-md-4">
                        <select id="engagement" name="engagement">
                            <option value="10">10 - Very engaging</option>
                            <option value="9">9</option>
                            <option value="8">8</option>
                            <option value="7">7</option>
                            <option value="6">6</option>
                            <option value="5" SELECTED>5 - Moderately</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                            <option value="0">0 - Not engaged</option>
                        </select>
                    </div>
                </div>
                <!-- end of a question -->


                <!-- beginning of a question -->
                <div class="row question">
                    <div class="col-md-8">
                        On a scale of 1-10 (where 10 is the most difficult), please rate how <b>DIFFICULT</b> you found the learning task:
                    </div>
                    <div class="col-md-4">
                        <select id="difficulty" name="difficulty">
                            <option value="10">10 - Very difficult</option>
                            <option value="9">9</option>
                            <option value="8">8</option>
                            <option value="7">7</option>
                            <option value="6">6</option>
                            <option value="5" SELECTED>5 - Moderately difficult</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                            <option value="0">0 - Not difficult at all</option>
                        </select>
                    </div>
                </div>
                <!-- end of a question -->
            </form>
        </div>

        <hr />

        <div class="instructionsnav">
            <div class="row">
                <div class="col-xs-2">
                </div>
                <div class="col-xs-7">
                </div>
                <div class="col-xs-3">
                    <button type="button" @click="next" id="next" value="next" class="btn btn-primary btn-lg continue">
                        Continue <span class="glyphicon glyphicon-arrow-right"></span>
                    </button>
                </div>
            </div>
        </div>


    </div>


  </div>
</template>

<script>

var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";


export default {

  created() {
    this.$store.commit('recordTrialData', {'phase':'postquestionnaire', 'status':'begin'});
  },

  methods: {
    next() {
      this.record_responses();
      this.$router.push({name: 'Complete'})
    },
    prompt_resubmit() {
      document.body.innerHTML = error_message;
      document.getElementById("#resubmit").addEventListener('click', function(){});
    },
    record_responses() {

      this.$store.commit('recordTrialData', {'phase':'postquestionnaire', 'status':'submit'});

      for (let el of document.getElementsByTagName('textarea')) {
        this.$store.commit('recordUnstructuredData', {id: el.id, value: el.value});
      }

      for (let el of document.getElementsByTagName('select')) {
        this.$store.commit('recordUnstructuredData', {id: el.id, value: el.value});
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
